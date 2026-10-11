// valfn_rename.cjs — 通用编号名(val/fn/obj/x/y/...)的上下文感知重命名
// MODE=propose : 仅生成重命名提案(不改文件), 写到 proposals/<file>.json 并打印摘要
// MODE=apply   : 用同一推断引擎对目标文件执行重命名(只改高置信度项)
//   FILE=<name.js>   目标文件(在 assets/ 下)
//   OVERRIDE=<f.json> 可选: {oldName:newName} 强制覆盖推断结果
//   AUTO=0            只应用 OVERRIDE 中的人工命名, 跳过自动推断(推荐)
//   COMP=<组件名>      单文件含多组件时, 只处理指定 __name 组件的作用域
//   DRY=1             只打印将要改的内容, 不写盘
//
// 设计原则: 只动"高置信度"推断; 推断不出或低置信度的变量保持原样, 等人工/半自动再处理。
const fs = require("fs"), path = require("path");
const { ASSETS, PROPOSALS, loadBabel, resolveInput } = require("./_resolve.cjs");
const babel = loadBabel();
const dir = ASSETS;
const outDir = PROPOSALS;

const GEN = /^(val|fn|from|obj|list|arr|x|y|el|item|data|tmp|res|ret|ctx|param|arg|idx|key|val2|fn2|refVal)[0-9]*$/;
const RESERVED = new Set(["delete","return","if","else","for","while","do","switch","case","break","continue","new","typeof","instanceof","in","of","void","this","class","extends","super","import","export","default","try","catch","finally","throw","yield","await","async","function","var","let","const","with","debugger","enum","public","private","protected","static","interface","type","namespace","implements","package","null","true","false","undefined","NaN","Infinity"]);

function safeName(n){
  if(!n) return null;
  if(RESERVED.has(n)) return null;
  if(!/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(n)) return null;
  return n;
}
// getAdminTicketActivity -> adminTicketActivity ; createDebateRounds -> debateRounds
function stripVerb(name){
  const m = name.match(/^(get|create|update|delete|del|put|post|fetch|send|load|save|search|upload|download|query|submit|add|remove|check|validate|format|parse|convert|use|toggle|set|open|close|build|calc|compute|render|handle|on|list|find)([A-Z].*)$/);
  if(m) return m[2].charAt(0).toLowerCase()+m[2].slice(1);
  return name;
}
function plural(n){ return /s$/.test(n)?n:n+"s"; }
function isSemanticFn(name){
  if(!/^[a-z]/.test(name)) return false;
  return /[A-Z]/.test(name) || /^(get|create|update|put|post|fetch|send|load|save|search|upload|use|toggle|set|add|remove|query|submit|handle|on|build|del|delete|calc|compute|render|check|validate|format|parse|convert|list|find)/i.test(name);
}
// 根据引用方式判断返回值是数组/集合 -> 复数化
function usedAsArray(refs){
  for(const r of refs){
    const p = r.parent;
    if(!p) continue;
    if(p.type==="MemberExpression" && p.object===r.node){
      const prop = p.property && p.property.name;
      if(["forEach","map","filter","some","every","find","findIndex","reduce","slice","concat","includes","push","sort","flatMap","entries","values","keys"].includes(prop)) return true;
    }
  }
  return false;
}
function infer(declPath, binding, importMap){
  const name = binding.identifier.name;
  if(!GEN.test(name)) return null;
  const refs = binding.referencePaths || [];
  // ---- 1) 变量声明带 init ----
  if(declPath.isVariableDeclarator()){
    const init = declPath.node.init;
    if(!init) return null;
    let e = init.type==="AwaitExpression"?init.argument:init;
    // 1a) 调用语义函数: val = await getXxx()  /  val = api.getXxx()
    if(e.type==="CallExpression"){
      let fnName=null;
      if(e.callee.type==="Identifier") fnName=e.callee.name;
      else if(e.callee.type==="MemberExpression" && e.callee.property && e.callee.property.type==="Identifier") fnName=e.callee.property.name;
      // 用 import 别名还原成真实语义名(来自 api chunk 的语义化导出)
      if(fnName && importMap && importMap[fnName]) fnName = importMap[fnName];
      if(fnName && isSemanticFn(fnName)){
        let base = stripVerb(fnName);
        if(base && base!==fnName){
          if(usedAsArray(refs)) base = plural(base);
          return safeName(base);
        }
      }
      // 1b) ref/computed/reactive/shallowRef(简单标识符或成员)
      if(e.callee.type==="Identifier" && /^(ref|computed|shallowRef|reactive|toRef|toRefs)$/.test(e.callee.name) && e.arguments.length){
        const a0=e.arguments[0];
        let b=null;
        if(a0.type==="Identifier" && !GEN.test(a0.name)) b=a0.name;
        else if(a0.type==="MemberExpression" && a0.object.type==="Identifier" && a0.property && a0.property.type==="Identifier" && !GEN.test(a0.object.name)) b=a0.object.name+a0.property.name.charAt(0).toUpperCase()+a0.property.name.slice(1);
        else if(a0.type==="BooleanLiteral"||a0.type==="NumericLiteral"||a0.type==="StringLiteral") return null; // 无法从字面量命名
        if(b){ const t = e.callee.name==="reactive"?b:b+"Ref"; return safeName(t); }
      }
      // 1c) useXxx() 组合式 -> xxx (首字母小写)
      if(e.callee.type==="Identifier" && /^use[A-Z]/.test(e.callee.name)){
        const t = e.callee.name.charAt(3).toLowerCase()+e.callee.name.slice(4);
        return safeName(t);
      }
      // 1d) JSON.parse(x) -> parsedX
      if(e.callee.type==="Identifier" && e.callee.name==="JSON" && e.arguments[0] && e.arguments[0].type==="Identifier" && !GEN.test(e.arguments[0].name)){
        return safeName("parsed"+e.arguments[0].name.charAt(0).toUpperCase()+e.arguments[0].name.slice(1));
      }
    }
    // 1e) obj.value -> objValue
    if(e.type==="MemberExpression" && e.property && e.property.name==="value" && e.object && e.object.type==="Identifier" && !GEN.test(e.object.name)){
      return safeName(e.object.name+"Value");
    }
    // 1f) obj.prop -> objProp (props.id -> propsId, route.params -> routeParams)
    if(e.type==="MemberExpression" && e.object && e.object.type==="Identifier" && e.property && e.property.type==="Identifier" && e.property.name!=="value" && !GEN.test(e.object.name) && !GEN.test(e.property.name)){
      return safeName(e.object.name+e.property.name.charAt(0).toUpperCase()+e.property.name.slice(1));
    }
    // 1g) 对象字面量 -> config/params/payload (按 key 提示)
    if(e.type==="ObjectExpression"){
      const keys = e.properties.map(p=>p.key&&p.key.name).filter(Boolean);
      if(keys.some(k=>/^(method|url|data|params|headers)$/.test(k))) return safeName("request");
      if(keys.length) return safeName("config");
      return safeName("config");
    }
    // 1h) 箭头/函数表达式赋值给 const -> 按用途推断 handler
    if((e.type==="ArrowFunctionExpression"||e.type==="FunctionExpression") && declPath.parentPath && declPath.parentPath.isVariableDeclarator()){
      // 用法的父调用: 看这个 const 被当作什么参数传入
      for(const r of refs){
        const call = r.parent && r.parent.type==="CallExpression" ? r.parent : null;
        if(call && call.callee && call.callee.type==="MemberExpression" && call.callee.property){
          const m=call.callee.property.name;
          if(m==="then") return safeName("onSuccess");
          if(m==="catch") return safeName("onError");
          if(m==="finally") return safeName("onFinally");
          if(m==="filter") return safeName("predicate");
          if(m==="map") return safeName("mapper");
          if(m==="sort") return safeName("comparator");
          if(m==="forEach") return safeName("eachFn");
          if(m==="reduce") return safeName("reducer");
          if(m==="some"||m==="every") return safeName("matcher");
        }
      }
      return safeName("handler");
    }
    return null;
  }
  // ---- 2) 函数声明 fnN ----
  if(declPath.isFunctionDeclaration()){
    // 看它被引用的方式(是否作为回调传入数组方法/then)
    for(const r of refs){
      const call = r.parent && r.parent.type==="CallExpression" ? r.parent : null;
      if(call && call.callee && call.callee.type==="MemberExpression" && call.callee.property){
        const m=call.callee.property.name;
        if(m==="filter") return safeName("predicate");
        if(m==="map") return safeName("mapper");
        if(m==="sort") return safeName("comparator");
        if(m==="forEach") return safeName("eachFn");
        if(m==="then") return safeName("onSuccess");
        if(m==="catch") return safeName("onError");
      }
    }
    return null;
  }
  // ---- 3) 函数参数 ----
  if(declPath.isIdentifier() && declPath.parentPath.isFunctionExpression || declPath.isIdentifier() && declPath.parentPath.isArrowFunctionExpression || declPath.parentPath.isFunctionDeclaration()){
    // 找所属函数, 判断参数位置与函数用途
    let fnPath = declPath.parentPath.isFunctionDeclaration()?declPath.parentPath : declPath.findParent(p=>p.isFunction()||p.isArrowFunctionExpression());
    if(fnPath){
      // 该匿名/箭头函数被当回调传入?
      const callParent = fnPath.parent;
      if(callParent && callParent.type==="CallExpression" && callParent.callee && callParent.callee.type==="MemberExpression" && callParent.callee.property){
        const m=callParent.callee.property.name;
        const idx = fnPath.node.params.indexOf(declPath.node);
        if(m==="then") return safeName("response");
        if(m==="catch") return safeName("err");
        if(["filter","map","some","every","find","findIndex","reduce","forEach","flatMap"].includes(m)){
          if(idx<=0) return safeName("item");
          if(idx===1) return safeName("index");
        }
        if(m==="sort"){ if(idx===0) return safeName("a"); if(idx===1) return safeName("b"); }
      }
      // addEventListener / on(event, fn) -> event
      if(callParent && callParent.type==="CallExpression" && callParent.callee && callParent.callee.type==="Identifier" && /^(addEventListener|on)$/.test(callParent.callee.name)){
        if(fnPath.node.params.indexOf(declPath.node)===0) return safeName("event");
      }
    }
    return null;
  }
  // ---- 4) catch 子句参数 ----
  if(declPath.parentPath.isCatchClause()){
    return safeName("err");
  }
  return null;
}

function collectProposals(code){
  const props=[];
  babel.transformSync(code,{
    sourceType:"unambiguous", babelrc:false, configFile:false, compact:false, comments:true,
    plugins:[({types:t})=>({
      visitor:{
        Program:{
          exit(progPath){
            const seen=new Set();
            // 构建 import 别名 -> 真实语义导出名 映射
            const importMap={};
            progPath.traverse({
              ImportDeclaration(p){
                p.node.specifiers.forEach(s=>{
                  if(s.type==="ImportSpecifier" && s.imported && s.imported.name && s.local && s.local.name){
                    importMap[s.local.name]=s.imported.name;
                  }
                });
              }
            });
            progPath.traverse({
              "VariableDeclarator|FunctionDeclaration"(p){
                let idPath = p.isVariableDeclarator()? p.get("id") : p.get("id");
                if(!idPath || !idPath.isIdentifier()) return;
                const nm = idPath.node.name;
                if(!GEN.test(nm)) return;
                const binding = p.scope.getBinding(nm);
                if(!binding) return;
                const target = infer(p, binding, importMap);
                if(target && target!==nm) props.push({old:nm,neu:target,kind:p.isVariableDeclarator()?"var":"fn",scope:binding.scope.block.type});
              },
              "Identifier"(p){
                // 参数 / catch 参数
                if(!GEN.test(p.node.name)) return;
                const parent = p.parent;
                if(parent.type==="AssignmentPattern" && parent.left===p.node) return; // 默认参数在声明处
                // 仅处理"声明为参数"的标识符
                let isParam=false, fnPar=null;
                if(parent.type==="FunctionDeclaration" && parent.params.includes(p.node)){isParam=true;fnPar=p.parentPath;}
                else if((parent.type==="ArrowFunctionExpression"||parent.type==="FunctionExpression") && parent.params.includes(p.node)){isParam=true;fnPar=p.parentPath;}
                else if(parent.type==="CatchClause" && parent.param===p.node){isParam=true;fnPar=p.parentPath;}
                if(!isParam) return;
                const binding = p.scope.getBinding(p.node.name);
                if(!binding) return;
                // 避免和上面的 var/fn 重复
                if(seen.has(p.node.name)) return;
                const target = infer(p, binding, importMap);
                if(target && target!==p.node.name) props.push({old:p.node.name,neu:target,kind:parent.type==="CatchClause"?"catch":"param",scope:fnPar?fnPar.node.type:"?"});
              }
            });
          }
        }
      }
    })]
  });
  return props;
}

// ============ 入口 ============
const MODE=process.env.MODE;
const FILE=process.env.FILE;
const DRY=process.env.DRY;
const OVERRIDE=process.env.OVERRIDE;
if(!MODE||!FILE){ console.log("用法: MODE=propose|apply FILE=<f.js> [DRY=1] [OVERRIDE=f.json]"); process.exit(1); }

const file=path.join(dir,FILE);
if(!fs.existsSync(file)){ console.log("文件不存在",file); process.exit(1); }
const code=fs.readFileSync(file,"utf8");

if(MODE==="propose"){
  if(!fs.existsSync(outDir)) fs.mkdirSync(outDir,{recursive:true});
  const props=collectProposals(code);
  // 统计原文件 GEN 绑定总数
  let total=0;
  const cntVisitor = {
    Program: {
      exit(p) {
        p.traverse({
          Identifier(n) {
            if (n.isIdentifier() && GEN.test(n.node.name) && n.scope.getBinding(n.node.name)) total++;
          }
        });
      }
    }
  };
  babel.transformSync(code, { sourceType:"unambiguous", babelrc:false, configFile:false, compact:false, comments:false, plugins:[()=>({visitor:cntVisitor})] });
  const out=path.join(outDir,FILE+".json");
  fs.writeFileSync(out,JSON.stringify(props,null,2));
  console.log(`\n=== ${FILE} ===`);
  console.log(`GEN 绑定总数(估): ${total}  |  高置信度提案: ${props.length}  (覆盖率 ${ (props.length/total*100).toFixed(1) }%)`);
  // 展示前 40 条
  props.slice(0,40).forEach(p=>console.log(`  ${p.old} -> ${p.neu}   [${p.kind}]`));
  console.log(`\n完整提案已写入 ${out}\n`);
  process.exit(0);
}

if(MODE==="apply"){
  let override={};
  const ovPath = resolveInput(OVERRIDE);
  if(ovPath && fs.existsSync(ovPath)) override=JSON.parse(fs.readFileSync(ovPath,"utf8"));
  else if(OVERRIDE) console.warn("警告: 找不到 override 文件 " + OVERRIDE + "，将忽略。");
  const useAuto = process.env.AUTO!=="0";
  const COMP = process.env.COMP || null;   // 仅处理指定组件(__name)
  const overrideKeys = new Set(Object.keys(override));
  const props=collectProposals(code);
  // 构建 old->neu(经 override 覆盖); AUTO=0 时仅采用 override
  const map={};
  for(const p of props){ map[p.old]= override[p.old]||p.neu; }
  for(const k of Object.keys(override)){ if(!map[k]) map[k]=override[k]; }
  const getComponentName=(p)=>{
    const dc=p.findParent(pa=>pa.isCallExpression()&&pa.node.callee&&pa.node.callee.name==="defineComponent");
    if(!dc) return null;
    const arg=dc.node.arguments[0];
    if(arg&&arg.type==="ObjectExpression") for(const prop of arg.properties){
      if(prop.type==="ObjectProperty"&&prop.key&&prop.key.name==="__name"&&prop.value.type==="StringLiteral") return prop.value.value;
    }
    return null;
  };
  // 应用: 按作用域 rename
  let applied=0, failed=0;
  const out=babel.transformSync(code,{
    sourceType:"unambiguous", babelrc:false, configFile:false, compact:false, comments:true,
    plugins:[({types:t})=>({
      visitor:{
        Program:{
          exit(progPath){
            // 收集所有 GEN binding 及其目标
            const targets=new Map(); // scope -> [{old,neu}]
            const collectOne=(nm, scope, comp)=>{
              if(!GEN.test(nm)) return;
              if(COMP && comp!==COMP) return;              // 仅处理指定组件
              if(!useAuto && !overrideKeys.has(nm)) return; // AUTO=0: 仅用人工 override
              const neu=map[nm];
              if(!neu||neu===nm) return;
              if(!targets.has(scope)) targets.set(scope,[]);
              targets.get(scope).push({old:nm,neu});
            };
            progPath.traverse({
              "VariableDeclarator|FunctionDeclaration|Identifier"(p){
                let idPath=null, isCatch=false, nm=null;
                if(p.isVariableDeclarator()){
                  // 解构声明: const { result: val3 } = ... -> 收集内部标识符名
                  if(p.node.id && p.node.id.type==="ObjectPattern"){
                    p.node.id.properties.forEach(pr=>{
                      if(pr && pr.type==="ObjectProperty" && pr.value && pr.value.type==="Identifier" && GEN.test(pr.value.name)){
                        collectOne(pr.value.name, p.scope, getComponentName(p));
                      }
                    });
                    return;
                  }
                  idPath=p.get("id");
                }
                else if(p.isFunctionDeclaration()){ idPath=p.get("id"); }
                else if(p.isIdentifier()){
                  const par=p.parent;
                  if(par.type==="CatchClause" && par.param===p.node){ idPath=p; isCatch=true; }
                  else if((par.type==="FunctionDeclaration"||par.type==="ArrowFunctionExpression"||par.type==="FunctionExpression") && par.params.includes(p.node)){ idPath=p; }
                  else return;
                  nm=p.node.name;
                }
                if(!idPath) return;
                if(!nm){ if(!idPath.isIdentifier()) return; nm=idPath.node.name; }
                collectOne(nm, p.scope, getComponentName(p));
              }
            });
            for(const [scope,items] of targets){
              const used=new Set();
              for(const it of items){
                let n=it.neu,i=2;
                while(scope.getOwnBinding(n)||used.has(n)) n=it.neu+(i++);
                used.add(n);
                try{ scope.rename(it.old,n); applied++; }catch(e){ failed++; }
              }
            }
          }
        }
      }
    })]
  });
  if(DRY){ console.log(`[DRY] ${FILE} 将重命名 ${applied} 处 (失败 ${failed})`); process.exit(0); }
  if(applied>0 || failed>0){
    fs.writeFileSync(file, out.code);
  }
  console.log(`apply ${FILE}: 重命名 ${applied} 处, 失败 ${failed}`);
  process.exit(0);
}
