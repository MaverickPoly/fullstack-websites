<script setup></script>

<template>
  <nav class="navbar">
    <h5 class="navbar-title">
      <span class="postgres">Postgres</span> + <span class="vue">Vue</span> +
      <span class="express">Express </span>
    </h5>
    <div class="navbar-links">
      <RouterLink to="/">
        <i class="pi pi-users nav-icon" />
      </RouterLink>
      <RouterLink to="/create">
        <i class="pi pi-user-edit nav-icon" />
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  //background-color: #001a34;
  color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  margin-bottom: 1rem;
}

.navbar-title {
  font-size: 1.2rem;
  font-weight: 600;
}

.navbar-title .postgres {
  color: #18a1ff;
}

.navbar-title .vue {
  color: #42b883;
}

.navbar-title .express {
  color: #777;
}

.navbar-links {
  display: flex;
  gap: 1.5rem;
}

.nav-icon {
  font-size: 1.5rem;
  color: white;
  transition:
    transform 0.2s ease,
    color 0.2s ease;
}

.nav-icon:hover {
  transform: scale(1.2);
  color: #00be6c;
}
</style>
