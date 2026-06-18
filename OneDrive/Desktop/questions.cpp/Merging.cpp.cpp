#include <bits/stdc++.h>
using namespace std; 
void MergeArray(int arr1[],int arr2[],int n1,int n2,int arr3[]){
    int i=0,j=0,k=0;
    while(i<n1){
        arr3[k++]=arr1[i++];
    }
    while(j<n2){
        arr3[k++]=arr2[j++];
    }
    sort(arr3,arr3+n1+n2);
}

int main(){
    int arr1[]={1,3,5,7,6};
    int n1=sizeof(arr1)/sizeof(arr1[0]);
     int arr2[]={8,9,3,5};
    int n2=sizeof(arr2)/sizeof(arr2[0]);
    int arr3[n1+n2];
    MergeArray(arr1,arr2,n1,n2,arr3);
    cout<<"After Merging"<<endl;
    for(int i=0;i<n1+n2;i++){
        cout<<arr3[i]<<" ";
    }
    return 0;


}
