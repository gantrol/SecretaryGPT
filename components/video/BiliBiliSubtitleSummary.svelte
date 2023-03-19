<script>
    import { onMount } from 'svelte';
    import {BilibiliAdapter} from "~utils/adapter/bilibili/bilibili";

    export let vm;
    export let isOpen;
    let hasSubtitles = false;
    let showSummaryPrompt = false;
    // TODO: 次要需求
    //  选择字幕
    //  选择语言

    const getCurrentPageText = async () => {
        const response = await fetch(window.location.href);
        return await response.text();
    };

    // main function to process subtitles
    const processSubtitles = async () => {
        const currentPageText = await getCurrentPageText();
        const bba = new BilibiliAdapter(currentPageText);
        // TODO: user select and language
        // TODO:
        const prompts = await bba.promptList();
        return prompts;
    }

    const checkForSubtitles = async () => {
        const prompts = await processSubtitles();
        hasSubtitles = prompts.length > 0;
        showSummaryPrompt = hasSubtitles;
    };

    onMount(async () => {
        // double check
        const regex = /^https:\/\/.*\.bilibili\.com\/video\/.*/;
        if (regex.test(window.location.href)) {
            await checkForSubtitles();
        }
    });

    const summarizeSubtitles = async () => {
        const prompts = await processSubtitles();
        console.log(prompts);
        try {
            isOpen = true;
            vm.bulkSendPrompts(prompts, () => {
                showSummaryPrompt = false;
                vm = vm;
            });
        } catch (e) {
            alert(e);
        }
    };
</script>

{#if showSummaryPrompt}
    <div class="fixed bottom-5 right-0 mb-4 mr-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
        <p class="text-gray-700">检测到字幕，要生成字幕总结吗？</p>
        <div class="mt-2">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    on:click={summarizeSubtitles}>
                生成总结
            </button>
            <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
                    on:click={() => showSummaryPrompt = false}>
                取消
            </button>
        </div>
    </div>
{/if}
