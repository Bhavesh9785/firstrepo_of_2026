// User data array
let users = [];
let editId = null;
let sortColumn = null;
let sortAsc = true;
let currentPage = 1;
const rowsPerPage = 5;

// DOM elements
const userForm = document.getElementById('userForm');
const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
const searchInput = document.getElementById('searchInput');
const pagination = document.getElementById('pagination');
const toast = document.getElementById('toast');
const darkModeToggle = document.getElementById('darkModeToggle');

// Helper: Show toast notification
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// Helper: Validate form
function validateForm() {
    let valid = true;
    // Name
    const name = userForm.name.value.trim();
    if (!name) {
        document.getElementById('nameError').textContent = 'Name is required.';
        valid = false;
    } else {
        document.getElementById('nameError').textContent = '';
    }
    // Email
    const email = userForm.email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        document.getElementById('emailError').textContent = 'Email is required.';
        valid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Invalid email format.';
        valid = false;
    } else {
        document.getElementById('emailError').textContent = '';
    }
    // Role
    const role = userForm.role.value;
    if (!role) {
        document.getElementById('roleError').textContent = 'Role is required.';
        valid = false;
    } else {
        document.getElementById('roleError').textContent = '';
    }
    // Status
    const status = userForm.status.value;
    if (!status) {
        document.getElementById('statusError').textContent = 'Status is required.';
        valid = false;
    } else {
        document.getElementById('statusError').textContent = '';
    }
    return valid;
}

// Helper: Reset form errors
function resetFormErrors() {
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('roleError').textContent = '';
    document.getElementById('statusError').textContent = '';
}

// Handle form submit
userForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const name = userForm.name.value.trim();
    const email = userForm.email.value.trim();
    const role = userForm.role.value;
    const status = userForm.status.value;

    if (editId !== null) {
        // Edit existing user
        const user = users.find(u => u.id === editId);
        user.name = name;
        user.email = email;
        user.role = role;
        user.status = status;
        showToast('User updated!');
        editId = null;
    } else {
        // Add new user
        const id = users.length ? users[users.length - 1].id + 1 : 1;
        users.push({ id, name, email, role, status });
        showToast('User added!');
    }
    userForm.reset();
    resetFormErrors();
    renderTable();
});

// Handle form reset
userForm.addEventListener('reset', function() {
    editId = null;
    resetFormErrors();
});

// Render table rows
function renderTable() {
    let filtered = users.filter(u =>
        u.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        u.email.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        u.role.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        u.status.toLowerCase().includes(searchInput.value.toLowerCase())
    );
}
   