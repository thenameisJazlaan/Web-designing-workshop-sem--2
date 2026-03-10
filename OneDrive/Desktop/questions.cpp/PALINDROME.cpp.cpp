#include <bits/stdc++.h>
using namespace std;

int main() 
{ int num,rev,a,b,c,d;
cin>>num;
cout<<endl<<"the inputed no is:>>"<<num;
a=(num/1000);
b=(num/100)%10;
c=(num/10)%10;
d=(num%10);
rev=(d*1000)+(c*100)+(b*10)+(a*1);
(num==rev)?cout<<"PALINDROME":
cout<<"NOT PALINDROME";

return 0;

}
