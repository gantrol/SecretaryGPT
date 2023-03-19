<script>
    import UISettings from "~components/setting/UISettings.svelte";
    import Links from "~components/Links.svelte";
</script>

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    div.main {
        min-width: 300px;
    }
</style>
<div class="main">
    <Links></Links>
    <UISettings></UISettings>
</div>


