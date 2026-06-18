#include <bits/stdc++.h>

using namespace std;

int main() {
    int n, num, i, pos = -1, mid, beg, end;
    cin >> n;
    int a[n];
    beg = 0;
    end = n - 1;
    for (i = 0; i < n; i++) {
        cin >> a[i];
    }
    // cout << "enter no.";
    cin >> num;
    mid = (beg + end) / 2;
    while (beg <= end) {
        if (a[mid] == num) {
            pos = mid;
            break;
        }
        else if (a[mid] < num)
            beg = mid + 1;
        else
            end = mid - 1;
        mid = (beg + end) / 2;
    }
    if (pos == -1)
        cout << "element not present";
    else
        cout << num << " " << "is found at " << pos + 1 << " position";
    return 0;

}