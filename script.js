let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const subject = document.getElementById("subjectSelect").value;

  if (taskInput.value.trim() === "") {
    alert("Please enter a task!");
    return;
  }

  const task = {
    id: Date.now(),
    name: taskInput.value,
    subject: subject,
    completed: false
  };

  tasks.push(task);
  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  const taskContainer = document.getElementById("taskContainer");
  taskContainer.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${task.subject}: ${task.name}</span>
      <div>
        <button class="complete-btn" onclick="toggleComplete(${task.id})">${task.completed ? "✅ Done" : "Mark Done"}</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">🗑 Delete</button>
      </div>
    `;

    if (task.completed) {
      li.style.textDecoration = "line-through";
      li.style.opacity = "0.7";
    }

    taskContainer.appendChild(li);
  });

  updateProgress();
}

function toggleComplete(id) {
  tasks = tasks.map(task => 
    task.id === id ? {...task, completed: !task.completed} : task
  );
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function updateProgress() {
  if (tasks.length === 0) {
    document.getElementById("progressFill").style.width = "0%";
    document.getElementById("progressText").innerText = "0% Completed";
    return;
  }

  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = Math.round((completedTasks / tasks.length) * 100);

  document.getElementById("progressFill").style.width = progress + "%";
  document.getElementById("progressText").innerText = `${progress}% Completed`;
}
