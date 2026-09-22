#1 输出900-1000中所有能被5整除的偶数，并统计个数。
total = 0
for i in range(900, 1000 + 1):
    if i % 5 == 0 and i % 2 == 0:
        print(i)
        total += 1
print(total)

#2 输入一个整数n，输出该数的所有约数（因数），并统计个数。
n = int(input())
total = 0
for i in range(1, n + 1):
    if n % i == 0:
        print(i)
        total += 1
print(total)

#3 输入一个正整数，判断该数是否是质数，如果是，输出"xx是质数"，
# 否则输出"xx是合数"。（提示：统计因数个数）
n = int(input())
i = 1
isPrime = True
while isPrime:
    i += 1
    if i * i > n:
        break
    if n % i == 0:
        isPrime = False
if n != 1:
    print(f"{n}是质数" if isPrime else f"{n}是合数")
