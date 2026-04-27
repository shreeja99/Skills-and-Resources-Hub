#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    stack<string> opportunities, internships, resources;
    string input;
    int choice;
    do {
        cout << "\n--- Stack Menu ---\n";
        cout << "1. Add Opportunity\n2. Add Internship\n3. Add Resource\n";
        cout << "4. Show Latest Opportunity/Internship/Resource\n5. Remove Latest\n6. Exit\n";
        cout << "Enter choice: ";
        cin >> choice;
        cin.ignore();  // To ignore leftover newline

        switch(choice) {
            case 1:
                cout << "Enter Opportunity: ";
                getline(cin, input);
                opportunities.push(input);
                break;
            case 2:
                cout << "Enter Internship: ";
                getline(cin, input);
                internships.push(input);
                break;
            case 3:
                cout << "Enter Resource: ";
                getline(cin, input);
                resources.push(input);
                break;
            case 4:
                if(!opportunities.empty()) cout << "Latest Opportunity: " << opportunities.top() << endl;
                else cout << "No Opportunities\n";
                if(!internships.empty()) cout << "Latest Internship: " << internships.top() << endl;
                else cout << "No Internships\n";
                if(!resources.empty()) cout << "Latest Resource: " << resources.top() << endl;
                else cout << "No Resources\n";
                break;
            case 5:
                if(!opportunities.empty()) { opportunities.pop(); cout << "Latest Opportunity removed\n"; }
                if(!internships.empty()) { internships.pop(); cout << "Latest Internship removed\n"; }
                if(!resources.empty()) { resources.pop(); cout << "Latest Resource removed\n"; }
                break;
            case 6:
                cout << "Exiting...\n";
                break;
            default:
                cout << "Invalid choice\n";
        }
    } while(choice != 6);
    return 0;
}
