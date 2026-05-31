document.addEventListener('DOMContentLoaded', function () {

    // 1. Active Navigation Link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 2. Scroll Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 3. Quiz Logic
    const questions = [
        { question: "Which activity do you enjoy the most?", options: { 1: ["Programming", "technical"], 2: ["Designing graphics", "creative"], 3: ["Managing a team", "management"], 4: ["Analyzing data", "analytical"] } },
        { question: "What do you usually do in your free time?", options: { 1: ["Build technical projects", "technical"], 2: ["Draw or design", "creative"], 3: ["Plan and organize tasks", "management"], 4: ["Solve puzzles", "analytical"] } },
        { question: "Which career sounds most appealing to you?", options: { 1: ["Software Developer", "technical"], 2: ["Designer", "creative"], 3: ["Project Manager", "management"], 4: ["Data Analyst", "analytical"] } },
        { question: "When facing a new challenge, what is your first instinct?", options: { 1: ["Break it down logically", "analytical"], 2: ["Start building something", "technical"], 3: ["Think creatively", "creative"], 4: ["Discuss with others", "management"] } },
        { question: "What motivates you most?", options: { 1: ["Solving problems", "analytical"], 2: ["Creating ideas", "creative"], 3: ["Leading people", "management"], 4: ["Building systems", "technical"] } },
        { question: "What do you enjoy most in a project?", options: { 1: ["Analyzing the data", "analytical"], 2: ["Designing the visuals", "creative"], 3: ["Managing the team", "management"], 4: ["Writing the code", "technical"] } },
        { question: "How do you make decisions?", options: { 1: ["Based on logic", "analytical"], 2: ["Based on intuition", "creative"], 3: ["People-first approach", "management"], 4: ["Execution-first mindset", "technical"] } },
        { question: "What describes you best?", options: { 1: ["Deep thinker", "analytical"], 2: ["Imaginative", "creative"], 3: ["Organized", "management"], 4: ["Builder", "technical"] } },
        { question: "What excites you most?", options: { 1: ["Spotting patterns", "analytical"], 2: ["Generating ideas", "creative"], 3: ["Leading a team", "management"], 4: ["Shipping something", "technical"] } },
        { question: "What is your preferred working style?", options: { 1: ["Independent analysis", "analytical"], 2: ["Creative exploration", "creative"], 3: ["Team coordination", "management"], 4: ["Hands-on building", "technical"] } },
        { question: "What do you prefer learning about?", options: { 1: ["Math and statistics", "analytical"], 2: ["Art and design", "creative"], 3: ["Business and strategy", "management"], 4: ["Technology and code", "technical"] } },
        { question: "What is your role in a group project?", options: { 1: ["Analyst", "analytical"], 2: ["Creative lead", "creative"], 3: ["Team leader", "management"], 4: ["Technical developer", "technical"] } },
        { question: "What frustrates you most?", options: { 1: ["Illogical thinking", "analytical"], 2: ["Lack of creativity", "creative"], 3: ["Poor organization", "management"], 4: ["Broken or inefficient systems", "technical"] } },
        { question: "What do you value most?", options: { 1: ["Truth and accuracy", "analytical"], 2: ["Originality", "creative"], 3: ["Order and structure", "management"], 4: ["Efficiency", "technical"] } },
        { question: "What would you most like to build?", options: { 1: ["A data model", "analytical"], 2: ["A visual design", "creative"], 3: ["An organization", "management"], 4: ["A software product", "technical"] } },
        { question: "What is your thinking style?", options: { 1: ["Logical and structured", "analytical"], 2: ["Imaginative and free", "creative"], 3: ["Strategic and big-picture", "management"], 4: ["Practical and hands-on", "technical"] } },
        { question: "Your strength in a word?", options: { 1: ["Thinking", "analytical"], 2: ["Imagination", "creative"], 3: ["Organization", "management"], 4: ["Execution", "technical"] } },
        { question: "What type of work suits you?", options: { 1: ["Research", "analytical"], 2: ["Creative work", "creative"], 3: ["Team collaboration", "management"], 4: ["Technical development", "technical"] } },
        { question: "What environment do you thrive in?", options: { 1: ["Data-driven workspace", "analytical"], 2: ["Creative studio", "creative"], 3: ["Team-based office", "management"], 4: ["Technical lab", "technical"] } },
        { question: "At your core, what defines you?", options: { 1: ["I think deeply", "analytical"], 2: ["I create freely", "creative"], 3: ["I lead others", "management"], 4: ["I build things", "technical"] } }
    ];

    const scores = { technical: 0, creative: 0, management: 0, analytical: 0 };

    const insights = {
        technical: "You are a BUILDER — You turn ideas into real systems and love the craft of making things work.",
        creative: "You are a CREATOR — You see possibilities others miss and bring beauty and meaning to the world.",
        management: "You are a LEADER — You organize people and vision, turning chaos into coordinated action.",
        analytical: "You are a THINKER — You simplify complexity into clarity and make sense of the world through data."
    };

    const journeyAnchors = { technical: 'technical', creative: 'creative', management: 'management', analytical: 'analytical' };

    let current = 0;

    const quizBtn = document.getElementById('quiz-btn');
    const quizWrapper = document.getElementById('quiz-wrapper');

    if (!quizBtn) return; // not on index page

    quizBtn.addEventListener('click', function () {
        quizBtn.style.display = 'none';
        quizWrapper.classList.remove('d-none');
        render();
    });

    function updateProgress() {
        const pct = (current / questions.length) * 100;
        const bar = document.getElementById('quiz-progress-bar');
        const label = document.getElementById('quiz-progress-label');
        if (bar) bar.style.width = pct + '%';
        if (label) label.textContent = `Question ${current + 1} of ${questions.length}`;
    }

    function answer(trait) {
        scores[trait]++;
        current++;
        if (current < questions.length) {
            render();
        } else {
            showResult();
        }
    }

    function render() {
        updateProgress();
        const q = questions[current];
        document.getElementById('quiz-question').textContent = q.question;
        const optionsDiv = document.getElementById('quiz-options');
        optionsDiv.innerHTML = '';
        for (let key in q.options) {
            const [text, trait] = q.options[key];
            const btn = document.createElement('button');
            btn.className = 'quiz-option-btn';
            btn.textContent = text;
            btn.addEventListener('click', () => answer(trait));
            optionsDiv.appendChild(btn);
        }
    }

    function showResult() {
        const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        const topScore = sorted[0][1];
        const topTraits = sorted.filter(x => x[1] === topScore).map(x => x[0]);
        const primaryTrait = topTraits[0];

        const progressBar = document.getElementById('quiz-progress-bar');
        if (progressBar) progressBar.style.width = '100%';
        const label = document.getElementById('quiz-progress-label');
        if (label) label.textContent = 'Complete!';

        let typeLabel = '';
        if (topTraits.length === 1) {
            typeLabel = primaryTrait.charAt(0).toUpperCase() + primaryTrait.slice(1);
        } else if (topTraits.length === 2) {
            typeLabel = topTraits.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(' + ');
        } else {
            typeLabel = 'Multi-Potential';
        }

        let insightHtml = '';
        topTraits.forEach(t => {
            insightHtml += `<p class="result-insight">${insights[t]}</p>`;
        });

        const anchor = journeyAnchors[primaryTrait] || '';
        const journeyUrl = `journey.html#${anchor}`;
        const oppUrl = `Opportunities.html#${anchor}`;

        document.getElementById('quiz-inner').innerHTML = `
            <div class="result-card">
                <p style="font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--brown-light);margin-bottom:0.5rem;">Your skill type</p>
                <div class="result-type">${typeLabel}</div>
                ${insightHtml}
                <hr class="gold-divider" style="margin:1.5rem 0;">
                <p style="font-size:0.95rem;color:var(--brown-mid);">Ready to explore what this means for your future?</p>
                <a href="${journeyUrl}" class="go-btn">See My Journey →</a>
                <a href="${oppUrl}" class="go-btn secondary">View Opportunities →</a>
            </div>
        `;
    }
});
