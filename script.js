
        // --- DOM Elements ---
        const authButtonsDiv = document.getElementById('auth-buttons');
        const showLoginBtn = document.getElementById('show-login-btn');
        const showRegisterBtn = document.getElementById('show-register-btn');
        const welcomeMessageDiv = document.getElementById('welcome-message');
        const logoutBtn = document.getElementById('logout-btn');
        const profileSection = document.getElementById('profile-section');
        const skillsInput = document.getElementById('skills-input');
        const interestsInput = document.getElementById('interests-input');
        const availabilitySelect = document.getElementById('availability-select');
        const findBtn = document.getElementById('find-opportunities-btn');
        const errorMessage = document.getElementById('error-message');

        // Modals & Content
        const loginModalOverlay = document.getElementById('login-modal-overlay');
        const loginModalCloseBtn = document.getElementById('login-modal-close-button');
        const loginForm = document.getElementById('login-form');
        const loginErrorMessage = document.getElementById('login-error-message');
        const registerModalOverlay = document.getElementById('register-modal-overlay');
        const registerModalCloseBtn = document.getElementById('register-modal-close-button');
        const registerForm = document.getElementById('register-form');
        const registerErrorMessage = document.getElementById('register-error-message');
        const switchToRegisterBtn = document.getElementById('switch-to-register-btn');
        const switchToLoginBtn = document.getElementById('switch-to-login-btn');

        const resultsModalOverlay = document.getElementById('results-modal-overlay');
        const resultsModalCloseBtn = document.getElementById('results-modal-close-button');
        const projectsList = document.getElementById('projects-list');
        const noProjects = document.getElementById('no-projects');
        const internshipsList = document.getElementById('internships-list');
        const noInternships = document.getElementById('no-internships');
        const resourcesList = document.getElementById('resources-list');
        const noResources = document.getElementById('no-resources');
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabPanels = document.querySelectorAll('.tab-panel');
        const countSpans = { projects: document.getElementById('count-projects'), internships: document.getElementById('count-internships'), resources: document.getElementById('count-resources') };

        const enrollModalOverlay = document.getElementById('enroll-modal-overlay');
        const enrollModalCloseBtn = document.getElementById('enroll-modal-close-button');
        const enrollOpportunityTitle = document.getElementById('enroll-opportunity-title');
        const enrollForm = document.getElementById('enroll-form');
        const enrollBackButton = document.getElementById('enroll-back-button');
        const enrollSuccessMessage = document.getElementById('enroll-success-message');

        // DSA Visualization Elements
        const dsaVisualizationSection = document.getElementById('dsa-visualization-section');
        const queueDisplay = document.getElementById('queue-display');
        const stackDisplay = document.getElementById('stack-display');

        // --- Mock Data ---
        const mockOpportunities = [ { id: 'p1', type: 'project', title: 'AI Chatbot for Campus Info', required: ['python', 'nlp', 'javascript'], interest: ['ai', 'web dev'], hours: 10, description: 'Develop an AI-powered chatbot.' }, { id: 'p2', type: 'project', title: 'Sustainable Energy Monitoring', required: ['iot', 'c++', 'data analysis'], interest: ['sustainability', 'electronics'], hours: 15, description: 'Build sensors to monitor energy usage.' }, { id: 'p3', type: 'project', title: 'VR Campus Tour', required: ['unity', 'c#', '3d modeling'], interest: ['vr', 'design', 'gaming'], hours: 12, description: 'Create an immersive virtual tour.' }, { id: 'p4', type: 'project', title: 'Robotics Arm Control', required: ['c++', 'robotics', 'algorithms'], interest: ['robotics', 'ai'], hours: 8, description: 'Implement control algorithms for a robotic arm.' }, { id: 'i1', type: 'internship', title: 'Web Dev Intern - IT Services', required: ['javascript', 'html', 'css'], interest: ['web dev'], hours: 15, description: 'Assist with campus website development.' }, { id: 'i2', type: 'internship', title: 'Data Analyst - Research Lab', required: ['python', 'data analysis', 'sql'], interest: ['ai', 'research'], hours: 10, description: 'Analyze research data using Python.' }, { id: 'i3', type: 'internship', title: 'CAD Assistant - Engineering Dept', required: ['cad', 'solidworks'], interest: ['engineering', 'design'], hours: 5, description: 'Help create 3D models for projects.' }, { id: 'r1', type: 'resource', title: 'Workshop: Intro to Python', required: [], interest: ['python', 'programming'], hours: 2, description: 'Beginner-friendly Python workshop.' }, { id: 'r2', type: 'resource', title: 'Mentor: Prof. Smith (AI/ML)', required: ['python'], interest: ['ai', 'machine learning'], hours: 1, description: 'Guidance on AI/ML projects.' }, { id: 'r3', type: 'resource', title: 'Online Course: C++ Fundamentals', required: [], interest: ['c++', 'programming'], hours: 5, description: 'Self-paced C++ course.' }, ];

        // --- DSA Simulation Data Structures ---
        let enrollmentQueue = []; // Simulate Queue (using array push/shift)
        let viewHistoryStack = []; // Simulate Stack (using array unshift/shift)
        const MAX_HISTORY_SIZE = 5;
        // REMOVED: let queueProcessorInterval = null; // No interval needed now

        // --- Helper Functions ---
        function parseInput(inputString) { if (!inputString) return new Set(); return new Set(inputString.toLowerCase().split(',').map(s => s.trim()).filter(s => s)); }
        function calculateJaccard(set1, set2) { const intersection = new Set([...set1].filter(x => set2.has(x))); const union = new Set([...set1, ...set2]); if (union.size === 0) return 0; return intersection.size / union.size; }

        // --- UI Update Functions for DSA Viz ---
        function updateQueueDisplay() {
            queueDisplay.innerHTML = ''; // Clear current display
            if (enrollmentQueue.length === 0) {
                queueDisplay.innerHTML = '<li class="dsa-list-empty">Queue is empty</li>';
            } else {
                // FIFO: Display oldest first (index 0) at the top
                enrollmentQueue.forEach((item, index) => {
                    const li = document.createElement('li');
                    li.textContent = `${index + 1}. ${item}`;
                    queueDisplay.appendChild(li);
                });
            }
        }

        function updateStackDisplay() {
            stackDisplay.innerHTML = ''; // Clear current display
            if (viewHistoryStack.length === 0) {
                 stackDisplay.innerHTML = '<li class="dsa-list-empty">History is empty</li>';
            } else {
                // LIFO: Display newest first (index 0) at the top
                viewHistoryStack.forEach((item, index) => {
                     const li = document.createElement('li');
                     li.textContent = `${index + 1}. ${item}`;
                     stackDisplay.appendChild(li);
                });
            }
        }

        // --- REMOVED Queue Processing Simulation Functions ---
        // function processQueueItem() { ... }
        // function startQueueProcessor() { ... }
        // function stopQueueProcessor() { ... }


        // --- createOpportunityElement ---
        function createOpportunityElement(opp) { const div = document.createElement('div'); div.className = 'bg-gray-50 p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-200'; let requiredTags = opp.required.map(skill => `<span class="tag bg-red-100 text-red-800">${skill}</span>`).join(''); let interestTags = opp.interest.map(intr => `<span class="tag bg-yellow-100 text-yellow-800">${intr}</span>`).join(''); div.innerHTML = `<h4 class="font-semibold text-gray-800">${opp.title}</h4><p class="text-sm text-gray-600 mt-1 mb-2">${opp.description}</p>${requiredTags || interestTags ? `<div>${requiredTags} ${interestTags}</div>` : ''}<p class="text-xs text-gray-500 mt-2">Estimated hours: ~${opp.hours}/week</p><p class="text-xs text-indigo-600 font-medium mt-1">Match Score: ${opp.score.toFixed(2)}</p><button class="enroll-button" data-title="${opp.title}">Enroll / Learn More</button>`; return div; }

        // --- Tab Switching Logic ---
        function switchTab(targetPanelId) { tabButtons.forEach(button => button.classList.remove('active')); tabPanels.forEach(panel => panel.classList.remove('active')); const activeButton = document.querySelector(`.tab-button[data-target="${targetPanelId}"]`); const activePanel = document.getElementById(targetPanelId); if (activeButton) activeButton.classList.add('active'); if (activePanel) activePanel.classList.add('active'); }
        tabButtons.forEach(button => { button.addEventListener('click', (e) => { e.stopPropagation(); const targetPanelId = button.getAttribute('data-target'); switchTab(targetPanelId); }); });

        // --- Modal Control Functions ---
        function openModal(overlayElement) { overlayElement.classList.remove('hidden'); }
        function closeModal(overlayElement) { overlayElement.classList.add('hidden'); }
        function closeAllModals() {
            closeModal(loginModalOverlay);
            closeModal(registerModalOverlay);
            closeModal(resultsModalOverlay);
            closeModal(enrollModalOverlay);
        }

        // --- Event Listeners for Modals ---
        showLoginBtn.addEventListener('click', () => openModal(loginModalOverlay));
        loginModalCloseBtn.addEventListener('click', () => closeModal(loginModalOverlay));
        loginModalOverlay.addEventListener('click', (e) => { if(e.target === loginModalOverlay) closeModal(loginModalOverlay); });

        showRegisterBtn.addEventListener('click', () => openModal(registerModalOverlay));
        registerModalCloseBtn.addEventListener('click', () => closeModal(registerModalOverlay));
        registerModalOverlay.addEventListener('click', (e) => { if(e.target === registerModalOverlay) closeModal(registerModalOverlay); });

        switchToRegisterBtn.addEventListener('click', () => { closeModal(loginModalOverlay); openModal(registerModalOverlay); });
        switchToLoginBtn.addEventListener('click', () => { closeModal(registerModalOverlay); openModal(loginModalOverlay); });

        resultsModalCloseBtn.addEventListener('click', () => closeModal(resultsModalOverlay));
        resultsModalOverlay.addEventListener('click', (e) => { if (e.target === resultsModalOverlay) closeModal(resultsModalOverlay); });
        enrollModalCloseBtn.addEventListener('click', () => closeModal(enrollModalOverlay));
        enrollModalOverlay.addEventListener('click', (e) => { if (e.target === enrollModalOverlay) closeModal(enrollModalOverlay); });
        enrollBackButton.addEventListener('click', () => { closeModal(enrollModalOverlay); openModal(resultsModalOverlay); });

        // --- Authentication Simulation ---
        function handleAuthSuccess() {
             closeAllModals();
             authButtonsDiv.classList.add('hidden');
             welcomeMessageDiv.classList.remove('hidden');
             profileSection.classList.remove('hidden');
             dsaVisualizationSection.classList.remove('hidden'); // Show DSA viz section
             loginErrorMessage.classList.add('hidden');
             registerErrorMessage.classList.add('hidden');
             loginForm.reset();
             registerForm.reset();
             // REMOVED: startQueueProcessor(); // No automatic processing
             updateQueueDisplay(); // Initial display update
             updateStackDisplay(); // Initial display update
        }

        function handleLogout() {
            authButtonsDiv.classList.remove('hidden');
            welcomeMessageDiv.classList.add('hidden');
            profileSection.classList.add('hidden');
            dsaVisualizationSection.classList.add('hidden'); // Hide DSA viz section
             skillsInput.value = ''; interestsInput.value = ''; availabilitySelect.selectedIndex = 0;
            closeAllModals();
            // REMOVED: stopQueueProcessor(); // No processor to stop
            enrollmentQueue = []; // Clear queue data
            viewHistoryStack = []; // Clear stack data
            updateQueueDisplay(); // Clear display
            updateStackDisplay(); // Clear display
        }

        loginForm.addEventListener('submit', (e) => { e.preventDefault(); const email = loginForm.email.value; const password = loginForm.password.value; if (email && password) { handleAuthSuccess(); } else { loginErrorMessage.textContent = "Please enter email and password."; loginErrorMessage.classList.remove('hidden'); } });
        registerForm.addEventListener('submit', (e) => { e.preventDefault(); const name = registerForm.name.value; const email = registerForm.email.value; const password = registerForm.password.value; const confirmPassword = registerForm.confirm_password.value; registerErrorMessage.classList.add('hidden'); if (!name || !email || !password || !confirmPassword) { registerErrorMessage.textContent = "Please fill all fields."; registerErrorMessage.classList.remove('hidden'); return; } if (password !== confirmPassword) { registerErrorMessage.textContent = "Passwords do not match."; registerErrorMessage.classList.remove('hidden'); return; } handleAuthSuccess(); });
        logoutBtn.addEventListener('click', handleLogout);

        // --- Handle Enrollment Clicks (UPDATED to add to Stack) ---
        resultsModalOverlay.addEventListener('click', function(event) {
            if (event.target.classList.contains('enroll-button')) {
                const title = event.target.getAttribute('data-title');

                // Add to view history stack (LIFO)
                viewHistoryStack.unshift(title); // Add to beginning
                // Limit stack size
                if (viewHistoryStack.length > MAX_HISTORY_SIZE) {
                     viewHistoryStack.pop(); // Remove the oldest item from the end
                }
                updateStackDisplay(); // Update the UI

                // Open enrollment modal
                enrollOpportunityTitle.textContent = title;
                closeModal(resultsModalOverlay);
                openModal(enrollModalOverlay);
                enrollSuccessMessage.classList.add('hidden'); // Reset success message
                enrollForm.reset(); // Reset form fields
            }
        });

        // --- Handle Enrollment Form Submission (UPDATED to add to Queue) ---
         enrollForm.addEventListener('submit', function(event) {
             event.preventDefault();
             const title = enrollOpportunityTitle.textContent;
             const name = enrollForm.name.value;
             const email = enrollForm.email.value;

             if (name && email && title) {
                 // Add to enrollment queue (FIFO)
                 enrollmentQueue.push(`Interest in "${title}" from ${name}`); // Enqueue
                 updateQueueDisplay(); // Update the UI

                 enrollSuccessMessage.classList.remove('hidden');
                 // Don't close modal immediately, let user see message or close manually
                 // Optionally disable submit button here
             } else {
                 // Basic validation feedback (could be more specific)
                 alert("Please fill in Name and Email.");
             }
         });


        // --- Main Find Opportunities Logic ---
        findBtn.addEventListener('click', () => {
            errorMessage.classList.add('hidden'); errorMessage.textContent = '';
            const studentSkills = parseInput(skillsInput.value);
            const studentInterests = parseInput(interestsInput.value);
            const availabilityValue = availabilitySelect.value;
            let studentHours = 999;
             if (availabilityValue === '15+') studentHours = 999;
             else if (availabilityValue.includes('-')) studentHours = parseInt(availabilityValue.split('-')[1]);

             if (studentSkills.size === 0 && studentInterests.size === 0) {
                 errorMessage.textContent = "Please enter at least one skill or interest.";
                 errorMessage.classList.remove('hidden');
                 return;
             }

            // Recommendation Logic (using Search + Sort concepts implicitly/explicitly)
            const scoredOpportunities = mockOpportunities.map(opp => { const requiredSkillsSet = new Set(opp.required); const interestSet = new Set(opp.interest); let meetsRequirements = true; if (requiredSkillsSet.size > 0) { const hasAnyRequired = [...requiredSkillsSet].some(skill => studentSkills.has(skill)); if (!hasAnyRequired) meetsRequirements = false; } const skillScore = calculateJaccard(studentSkills, requiredSkillsSet); const interestScore = calculateJaccard(studentInterests, interestSet); let score = 0; if(meetsRequirements) { score = (skillScore * 0.7) + (interestScore * 0.3); } else if (requiredSkillsSet.size === 0 && interestSet.size > 0 && [...interestSet].some(intr => studentInterests.has(intr))) { score = interestScore * 0.5; meetsRequirements = true; } if (opp.hours > studentHours && studentHours !== 999) { score *= 0.5; } return { ...opp, score, meetsRequirements }; });
            const recommended = scoredOpportunities.filter(opp => opp.meetsRequirements && opp.score > 0.05).sort((a, b) => b.score - a.score); // Sorting applied here


            // --- Populate Tabs ---
            projectsList.innerHTML = ''; internshipsList.innerHTML = ''; resourcesList.innerHTML = '';
             noProjects.classList.add('hidden'); noInternships.classList.add('hidden'); noResources.classList.add('hidden');
            const projects = recommended.filter(o => o.type === 'project');
            const internships = recommended.filter(o => o.type === 'internship');
            const resources = recommended.filter(o => o.type === 'resource');
             countSpans.projects.textContent = projects.length; countSpans.internships.textContent = internships.length; countSpans.resources.textContent = resources.length;
             if (projects.length > 0) projects.forEach(p => projectsList.appendChild(createOpportunityElement(p))); else noProjects.classList.remove('hidden');
             if (internships.length > 0) internships.forEach(i => internshipsList.appendChild(createOpportunityElement(i))); else noInternships.classList.remove('hidden');
             if (resources.length > 0) resources.forEach(r => resourcesList.appendChild(createOpportunityElement(r))); else noResources.classList.remove('hidden');

             // Switch to first tab with results
             if (projects.length > 0) switchTab('panel-projects');
             else if (internships.length > 0) switchTab('panel-internships');
             else if (resources.length > 0) switchTab('panel-resources');
             else switchTab('panel-projects');

             // Open the results modal
             openModal(resultsModalOverlay);
        });

         // --- Initial State ---
         switchTab('panel-projects');
         profileSection.classList.add('hidden');
         welcomeMessageDiv.classList.add('hidden');
         dsaVisualizationSection.classList.add('hidden'); // Ensure DSA viz is hidden initially

    
