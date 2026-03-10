#include <bits/stdc++.h>
using namespace std;

int main() 
{ int d1,d2,d3,d4,num;
int sum=0;
cin>>num;
cout<<endl<<"the entered no id:>>"<<num;
d1=(num/1000);
d2=(num/100)%10;
d3=(num/10)%10;
d4=(num%10);
sum=d1+d2+d3+d4;
cout<<endl<<"sum"<<sum;

return 0;

}
