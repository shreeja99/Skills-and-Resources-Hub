#include <iostream>
#include <queue>
#include <string>
using namespace std;

int main() {
    queue<string> q;
    string item;
    int choice;

    cout << "=== Skills & Opportunities Hub (Queue Simulation) ===\n";

    do {
        cout << "\n1. Add (Opportunity/Internship/Resource)";
        cout << "\n2. View Next Pending";
        cout << "\n3. Process One";
        cout << "\n4. Exit\n";
        cout << "Enter choice: ";
        cin >> choice;
        cin.ignore();

        if (choice == 1) {
            cout << "Enter Opportunity/Internship/Resource: ";
            getline(cin, item);
            q.push(item);
            cout << "Added: " << item << endl;
        } 
        else if (choice == 2) {
            if (!q.empty()) cout << "Next: " << q.front() << endl;
            else cout << "Nothing pending.\n";
        } 
        else if (choice == 3) {
            if (!q.empty()) {
                cout << "Processing: " << q.front() << endl;
                q.pop();
            } else cout << "Nothing to process.\n";
        } 
        else if (choice == 4) cout << "Exiting...\n";
        else cout << "Invalid choice!\n";

    } while (choice != 4);

    return 0;
}
