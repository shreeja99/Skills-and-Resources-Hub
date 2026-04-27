#include <iostream>
#include <string>
#include <algorithm>
#include <stack>
#include <queue>
using namespace std;

// Linear Search
void linearSearch(string items[], int n, string userSkills[], int m, string category) {
    cout << "\nMatching " << category << ":\n";
    bool found = false;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (m > 0 && items[i].find(userSkills[j]) != string::npos) {
                cout << items[i] << endl;
                found = true;
                break;
            }
        }
    }
    if (!found)
        cout << "No matching " << category << " found.\n";
}

// Binary Search (exact match)
void binarySearch(string items[], int n, string key, string category){
    sort(items, items + n);
    int low = 0, high = n - 1;
    bool found = false;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (items[mid] == key) {
            cout << key << " found in " << category << endl;
            found = true;
            break;
        } else if (items[mid] < key) {
            low = mid + 1; //search continue in right half 
        } else {
            high = mid - 1;
        }
    }
    if (!found)
        cout << key << " not found in " << category << endl;
}

// Bubble Sort
void bubbleSort(string arr[], int n){
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++){
            if (arr[j] > arr[j + 1]){
                string temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

void sortCategory(string categoryName){
    int n;
    cout << "Enter number of " << categoryName << ": ";
    cin >> n;
    cin.ignore();
    string arr[50];
    for (int i = 0; i < n; i++){
        cout << "Enter " << categoryName << " " << i + 1 << ": ";
        getline(cin, arr[i]);
    }
    bubbleSort(arr, n);
    cout << "\nSorted " << categoryName << ":\n";
    for (int i = 0; i < n; i++)
        cout << i + 1 << ". " << arr[i] << endl;
}

int main() {
    // Predefined data
    string opportunities[6] = { "Web Dev", "AI", "App Project", "Robotics", "Cybersecurity", "ML Project" };
    string internships[3] = { "AI Bootcamp", "Web Dev Internship", "Research Intern" };
    string resources[3] = { "C++ Guide", "AI Tutorials", "DSA Notes" };

    string userSkills[10];
    int skillCount = 0;

    stack<string> latestOpportunities, latestInternships, latestResources;
    queue<string> pendingOpportunities, pendingInternships, pendingResources;

    int choice;
    string input;

    do {
        cout << "\n=== Skills & Resources Hub Menu ===\n";
        cout << "1. Enter Skills/Interests\n";
        cout << "2. Linear Search \n";
        cout << "3. Binary Search (Exact Match)\n";
        cout << "4. Bubble Sort (User Input)\n";
        cout << "5. Stack Operations\n";
        cout << "6. Queue Operations\n";
        cout << "7. Exit\n";
        cout << "Enter choice: ";
        cin >> choice;
        cin.ignore();

        switch (choice) {
            case 1: {
                cout << "Enter your skills/interests (type 'done' to finish):\n";
                skillCount = 0;
                while (true) {
                    getline(cin, input);
                    if (input == "done" || skillCount >= 10)
                        break;
                    userSkills[skillCount++] = input;
                }
                break;
            }

            case 2:
                // Linear Search
                linearSearch(opportunities, 5, userSkills, skillCount, "Opportunities");
                linearSearch(internships, 3, userSkills, skillCount, "Internships");
                linearSearch(resources, 3, userSkills, skillCount, "Resources");
                break;

            case 3: {
                // Binary Search
                cout << "Enter opportunity/internship/resource to search: ";
                getline(cin, input);
                binarySearch(opportunities, 5, input, "Opportunities");
                binarySearch(internships, 3, input, "Internships");
                binarySearch(resources, 3, input, "Resources");
                break;
            }

            case 4:
                // Bubble Sort
                cout << "\nSorting Opportunities:\n";
                sortCategory("Opportunities");
                cout << "\nSorting Internships:\n";
                sortCategory("Internships");
                cout << "\nSorting Resources:\n";
                sortCategory("Resources");
                break;

            case 5: {
                // Stack
                int sChoice;
                do {
                    cout << "\n--- Stack Menu ---\n";
                    cout << "1. Add Opportunity\n2. Add Internship\n3. Add Resource\n";
                    cout << "4. Show Latest\n5. Remove Latest\n6. Back\n";
                    cout << "Enter choice: ";
                    cin >> sChoice;
                    cin.ignore();

                    switch (sChoice) {
                        case 1:
                            cout << "Enter Opportunity: ";
                            getline(cin, input);
                            latestOpportunities.push(input);
                            break;
                        case 2:
                            cout << "Enter Internship: ";
                            getline(cin, input);
                            latestInternships.push(input);
                            break;
                        case 3:
                            cout << "Enter Resource: ";
                            getline(cin, input);
                            latestResources.push(input);
                            break;
                        case 4: {
                            if (!latestOpportunities.empty())
                                cout << "Latest Opportunity: " << latestOpportunities.top() << endl;
                            else
                                cout << "No latest Opportunity\n";
                            if (!latestInternships.empty())
                                cout << "Latest Internship: " << latestInternships.top() << endl;
                            else
                                cout << "No latest Internship\n";
                            if (!latestResources.empty())
                                cout << "Latest Resource: " << latestResources.top() << endl;
                            else
                                cout << "No latest Resource\n";
                            break;
                        }
                        case 5: {
                            if (!latestOpportunities.empty()) {
                                latestOpportunities.pop();
                                cout << "Removed latest Opportunity\n";
                            } else {
                                cout << "No Opportunity to remove\n";
                            }
                            if (!latestInternships.empty()) {
                                latestInternships.pop();
                                cout << "Removed latest Internship\n";
                            } else {
                                cout << "No Internship to remove\n";
                            }
                            if (!latestResources.empty()) {
                                latestResources.pop();
                                cout << "Removed latest Resource\n";
                            } else {
                                cout << "No Resource to remove\n";
                            }
                            break;
                        }
                        case 6:
                            break;
                        default:
                            cout << "Invalid choice\n";
                    }
                } while (sChoice != 6);
                break;
            }

            case 6: {
                // Queue
                int qChoice;
                do {
                    cout << "\n--- Queue Menu ---\n";
                    cout << "1. Add Pending Item (Enqueue)\n2. View All Pending Items\n3. Process One Item (Dequeue)\n4. Back\n";
                    cout << "Enter choice: ";
                    cin >> qChoice;
                    cin.ignore();

                    switch (qChoice) {
                        case 1: {
                            cout << "Enter category (opportunity/internship/resource): ";
                            getline(cin, input);
                            cout << "Enter item to add: ";
                            string item;
                            getline(cin, item);
                            if (input == "opportunity") {
                                pendingOpportunities.push(item);
                                cout << "Enqueued Opportunity: " << item << endl;
                            }
                            else if (input == "internship") {
                                pendingInternships.push(item);
                                cout << "Enqueued Internship: " << item << endl;
                            }
                            else if (input == "resource") {
                                pendingResources.push(item);
                                cout << "Enqueued Resource: " << item << endl;
                            }
                            else
                                cout << "Invalid category\n";
                            break;
                        }

                        case 2: {
                            cout << "\n--- All Pending Items (FIFO) ---\n";
                            queue<string> tempQ;

                            if (!pendingOpportunities.empty()) {
                                cout << "Opportunities Queue: ";
                                tempQ = pendingOpportunities;
                                while (!tempQ.empty()) {
                                    cout << tempQ.front() << " ";
                                    tempQ.pop();
                                }
                                cout << endl;
                            } else cout << "Opportunities Queue is empty\n";

                            if (!pendingInternships.empty()) {
                                cout << "Internships Queue: ";
                                tempQ = pendingInternships;
                                while (!tempQ.empty()) {
                                    cout << tempQ.front() << " ";
                                    tempQ.pop();
                                }
                                cout << endl;
                            } else cout << "Internships Queue is empty\n";

                            if (!pendingResources.empty()) {
                                cout << "Resources Queue: ";
                                tempQ = pendingResources;
                                while (!tempQ.empty()) {
                                    cout << tempQ.front() << " ";
                                    tempQ.pop();
                                }
                                cout << endl;
                            } else cout << "Resources Queue is empty\n";
                            break;
                        }

                        case 3: {
                            if (!pendingOpportunities.empty()) {
                                cout << "Dequeued Opportunity: " << pendingOpportunities.front() << endl;
                                pendingOpportunities.pop();
                            } else cout << "No Opportunity to process\n";

                            if (!pendingInternships.empty()) {
                                cout << "Dequeued Internship: " << pendingInternships.front() << endl;
                                pendingInternships.pop();
                            } else cout << "No Internship to process\n";

                            if (!pendingResources.empty()) {
                                cout << "Dequeued Resource: " << pendingResources.front() << endl;
                                pendingResources.pop();
                            } else cout << "No Resource to process\n";
                            break;
                        }

                        case 4:
                            break;

                        default:
                            cout << "Invalid choice\n";
                    }
                } while (qChoice != 4);
                break;
            }

            case 7:
                cout << "Exiting...\n";
                break;
            default:
                cout << "Invalid choice\n";
        }
    } while (choice != 7);

    return 0;
}
