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
    <div class="p-4">
        <h1 class="text-lg font-bold mb-2">API Key Settings</h1>
        <form>
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="api_key">
                    API Key
                </label>
                <input class="appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full" id="api_key" type="text" placeholder="Enter API Key">
            </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline" type="button" id="save_button">
                Save
            </button>
        </form>
    </div>

</div>


