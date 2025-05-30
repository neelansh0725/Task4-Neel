# 🔄 To-Do List Web App — Recent Changes

This document outlines the **latest updates and improvements** made to the Responsive To-Do List Web App project.

---

## 📱 Mobile Responsiveness

- ✅ Added `@media (max-width: 768px)` query to handle small screen devices
- ✅ Form fields (`taskInput`, `dueDateInput`, `addTaskBtn`) stack vertically on mobile
- ✅ Font sizes reduced for smaller screens
- ✅ Buttons and filters become full-width and easier to tap
- ✅ Task items stack vertically with better spacing

---

## 🎨 Background Enhancements

- ✅ Introduced a full-screen background image using:
  ```css
  background: url("background.jpg") no-repeat center center fixed;
  background-size: cover;
  ```
- ✅ Updated `.container` with a semi-transparent background for improved readability:
  ```css
  background: rgba(31, 31, 31, 0.85);
  ```

---

## ✨ UI & UX Improvements

- ✅ Hover effects added to task items, filters, and buttons for interactivity
- ✅ Task items fade in with animation for smooth user experience
- ✅ Active and hover filter buttons glow to match the Netflix-inspired theme

---

## 🛠️ Code Structure

- CSS changes implemented in `style.css` at the bottom of the file
- Responsive layout and adaptive design tested with Chrome DevTools

---

## 🔧 How to Apply

1. Replace or update your existing `style.css` file with the latest version.
2. Ensure `background.jpg` is present in your project directory.
3. Open `index.html` in Chrome → Use DevTools → Toggle mobile toolbar to verify.

---

## 📅 Last Updated

**May 30, 2025**
