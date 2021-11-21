<template>  
  <footer class="footer">
    <div class="content has-text-centered">
      <p>Last updated: {{lastUpdated}} - v{{version}}</p>
      <p>Powered by: Gairacalabs</p>
    </div>
  </footer>
</template>

<script>
export default {
  props: ['lastUpdated', 'version']
}
</script>
