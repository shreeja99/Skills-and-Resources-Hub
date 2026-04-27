#include <iostream>
#include <string>
using namespace std;

// Function to sort array of strings using Bubble Sort
void bubbleSort(string arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                string temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}

// Function to input and sort a category
void sortCategory(string categoryName) {
    int n;
    cout << "Enter number of " << categoryName << ": ";
    cin >> n;
    cin.ignore(); // to clear newline

    string arr[n];
    for (int i = 0; i < n; i++) {
        cout << "Enter " << categoryName << " " << i+1 << ": ";
        getline(cin, arr[i]);
    }

    bubbleSort(arr, n);

    cout << "\nSorted " << categoryName << ":\n";
    for (int i = 0; i < n; i++) {
        cout << i+1 << ". " << arr[i] << endl;
    }
    cout << "-----------------------------\n";
}

int main() {
    sortCategory("Opportunities");
    sortCategory("Internships");
    sortCategory("Resources");

    return 0;
}
