#include <bits/stdc++.h>
using namespace std;

int main() {
int i,n,j,temp;
int a[n];
cin>>n;

for(i=0;i<n;i++)
{
cin>>a[i];
}

for(i=1;i<=n-1;i++){
j=i;
while(j>0 && a[j-1]>a[j]){
 temp=a[j];
 a[j]=a[j-1];
 a[j-1]=temp;
 j--;
}
}
cout<<"Sorted Array is "<<endl;
for(i=0;i<n;i++)
{
cout<<" "<<a[i];
}
return 0;
}