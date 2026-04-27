#include <iostream>
#include <algorithm>
using namespace std;

// Binary Search for array of strings
void binarySearch(string items[], int n, string key, string category) {
    sort(items, items + n); // sort the array
    int low = 0, high = n - 1;
    bool found = false;

    while (low <= high) {
        int mid = (low + high) / 2;
        if (items[mid] == key) {
            cout << key << " found in " << category << endl;
            found = true;
            break;
        } else if (items[mid] < key) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    if (!found) {
        cout << key << " not found in " << category << endl;
    }
}

int main() {
    string opps[] = {"Web Dev", "AI Intern", "App Project", "Cybersecurity"};
    string interns[] = {"AI Bootcamp", "Web Dev Internship"};
    string resources[] = {"C++ Guide", "AI Tutorials"};

    int oppsSize = sizeof(opps) / sizeof(opps[0]);
    int internsSize = sizeof(interns) / sizeof(interns[0]);
    int resourcesSize = sizeof(resources) / sizeof(resources[0]);

    string key;
    cout << "Enter opportunity/interest to search: ";
    getline(cin, key);

    binarySearch(opps, oppsSize, key, "Opportunities");
    binarySearch(interns, internsSize, key, "Internships");
    binarySearch(resources, resourcesSize, key, "Resources");

    return 0;
}
