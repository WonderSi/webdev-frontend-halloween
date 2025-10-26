<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    Sidebar
  }
}
</script>


<template>
  <div id="app">
    <AppHeader />
    
    <div class="container">
      <Sidebar />
      <main class="content">
        <router-view />
      </main>
    </div>
    
    <AppFooter />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  display: flex;
  flex: 1;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>
