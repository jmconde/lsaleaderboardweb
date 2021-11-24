<template>  
  <footer class="footer">
    <div class="content has-text-centered">
    <p>Version {{version}} - Powered by: Gairacalabs</p>
    </div>
  </footer>
</template>

<script>
export default {
  props: ['lastUpdated', 'version']
}
</script>
