#include <iostream>
#include <string>
using namespace std;

int main() {
    string opportunities[] = {"Web Dev", "AI Intern", "App Project", "Cybersecurity"};
    string internships[] = {"AI Bootcamp", "Web Dev Internship"};
    string resources[] = {"C++ Guide", "AI Tutorials"};

    string userSkills[10];
    string skill;
    int skillCount = 0;

    cout << "Enter your skills/interests (type 'done' to finish):\n";
    while (true) {
        getline(cin, skill);
        if (skill == "done") break;
        userSkills[skillCount++] = skill;
    }
    auto search = [&](string items[], int size, string type) {
        cout << "\nMatching " << type << ":\n";
        bool found = false;
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < skillCount; j++) {
                if (items[i].find(userSkills[j]) != string::npos) {
                    cout << items[i] << endl;
                    found = true;
                }
            }
        }
        if (!found) cout << "No matching " << type << " found.\n";
    };

    search(opportunities, 4, "Opportunities");
    search(internships, 2, "Internships");
    search(resources, 2, "Resources");

    return 0;
}









