#include <bits/stdc++.h>
using namespace std;
//CODE FOR DELETION IN ARRAY
int main() {
    int arr[]={5,89,42,15,36};
    int n=sizeof(arr)/sizeof(int);
    int key=15;
    for(int i=0;i<n;i++){
        if(arr[i]==key){
            n=n-1;
            for(int j=i;i<n;i++){
                arr[j]=arr[j+1];
            }
            break;
        }
    }
    for(int i=0;i<n;i++)
    cout<<arr[i]<<" ";
    return 0;

    
}
