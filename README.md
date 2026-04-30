# Democracy Assist – Election Process Assistant

## 🧭 Challenge Vertical
Election Process Education

---

## 🧠 Overview
Democracy Assist is an AI-powered web application designed to simplify and guide users through the election process in an interactive and structured way.

It helps users understand key stages such as registration, nomination, campaigning, voting, and counting.

---

## ⚙️ Approach & Logic

The system is built around a **guided flow + AI assistant model**:

- Users navigate through structured election stages via a dashboard
- The AI assistant responds contextually based on user queries
- Information is simplified into step-by-step actionable guidance

### 🧩 Decision Logic
- If user asks about a process → provide step-by-step instructions
- If user asks general questions → provide simplified explanations
- If user navigates a stage → UI updates contextually

---

## 🤖 Features

- Interactive election flow (registration → voting → counting)
- AI assistant for answering queries
- Authentication system (login/signup)
- FAQ-based structured knowledge
- Clean and guided dashboard UI

---

## ☁️ Google Services Used

- Google Cloud Run (deployment)
- Google Authentication (Sign-In)

---

## 🔒 Security

- Authentication-based access control
- No sensitive data stored on client
- Basic input handling and validation

---

## 🧪 Testing

Basic testing added to validate core functionality:
- Application rendering
- Basic interaction flow

---

## ♿ Accessibility

- Structured UI for easy navigation
- Readable layout and clear content hierarchy
- Basic accessibility improvements (labels, navigation)

---

## 🚀 How it Works

1. User logs in or continues as guest
2. Navigates election stages through sidebar
3. Interacts with AI assistant for help
4. Receives simplified, actionable guidance

---

## ⚠️ Assumptions

- Election steps are generalized for understanding
- Not tied to a specific country’s system
