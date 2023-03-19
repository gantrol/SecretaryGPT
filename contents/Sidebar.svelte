<script context="module">
    import icon_closed from "~/assets/icon.png"
    import icon_opened from "~/assets/icon1.png"
    import cssText from "data-text:~/contents/sidebar.css"
    import "~/contents/sidebar-base.css"

    export const config = {
        matches: ["<all_urls>"]
    }

    export const getShadowHostId = () => "secretaire-sidebar"
    // Inject into the ShadowDOM
    export const getStyle = () => {
        const style = document.createElement("style")
        style.textContent = cssText
        return style
    }

</script>

<script>
    import Chat from "~components/Chat.svelte";
    import SimpleSelect from "~components/SimpleSelect.svelte";
    import {chatTypes, Settings} from "~utils/constants";
    import {ChatViewModel, SidebarViewModel} from "~utils/viewmodel";
    import PromiseWaiting from "~components/PromiseWaiting.svelte";
    import {browserSyncStorage} from "~utils/store/browser";
    import Links from "~components/Links.svelte";
    import Icon from "~components/Icon.svelte";
    import VerticalNavList from "~components/tailwind/VerticalNavList.svelte";

    let isOpen;

    let promises = [
        new Promise(async (resolve) => {
            let test = browserSyncStorage(Settings.alwaysOpen, false);
            await test.init();
            isOpen = await test.get();
            resolve(isOpen);
        })
    ];

    let selectedText = "";

    let chatType = chatTypes.ChatGPT;

    let sidebar;
    let sidebarVM = new SidebarViewModel(420);
    let dragholder;
    let x;
    let w;

    $: if (sidebar) {
        // change value of --sidebar-width
        sidebar.style.setProperty('--sidebar-width', `${sidebarVM.width}px`);
    }

    let vm;
    $: vm = new ChatViewModel(chatType);
    $: vm.typingMessage = selectedText;

    /**
     * 选择并更新输入框的文字，鼠标抬起时触发。在侧边栏选中的文字除外
     */
    const handleMouseUp = () => {
        // 在侧边栏选中的文字不算
        if (window.getSelection()?.baseNode?.tagName === 'HTML') {
            return;
        }
        const selection = getSelected();

        if (selection) {
            selectedText = selection;
        }
    }

    // TODO: 重构到 SidebarViewModel
    const getSelected = () => {
        const selection = window.getSelection();
        return selection.toString().trim();
    }

    const openOnClick = () => isOpen = !isOpen;

    const newConv = () => {
        selectedText = "";
    }


    window.addEventListener("mouseup", onMouseUp);

    function onMouseMove(e) {
        e.preventDefault();
        const dx = x - e.clientX;
        sidebarVM.width = w + dx;
    }

    function onMouseDown(e) {
        x = e.clientX;
        w = sidebarVM.width;
        window.addEventListener('mousemove', onMouseMove);
    }

    function onMouseUp(_e) {
        handleMouseUp();
        window.removeEventListener('mousemove', onMouseMove);
    }

</script>

<svelte:window
        on:mouseup={(e) => {
            onMouseUp(e);
        }}

/>

<!--TODO: 拆分为更细颗粒度的组件, 可能涉及 store-->
<PromiseWaiting promises={promises}>
    <div bind:this={sidebar} class='{isOpen ? "open" : "closed"} h-full bg-base-100'
         id="secretaire-sidebar">
        <div class="drawer bg-base-100">
            <input class="drawer-toggle" id="chat-drawer" type="checkbox"/>
            <div class="drawer-content bg-base-100">
                <!-- Navbar -->

                <div bind:this={dragholder}
                     class="absolute left-0 h-screen w-1 bg-base-300
                        active:cursor-col-resize hover:cursor-col-resize"
                     id="secretaire-sidebar-holder"
                     on:mousedown={onMouseDown}
                     on:mouseup={onMouseUp}
                ></div>
                <div class="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100
                    text-base-content shadow-sm
                    bg-base-100
                    ">
                    <nav class="w-full navbar bg-base-300 flex flex-row justify-between">
                        <div class="flex-none">
                            <label class="btn btn-primary drawer-button btn-ghost" for="chat-drawer">
                                <svg class="inline-block w-6 h-6 stroke-current" fill="none" height={30} viewBox="0 0 24 24"
                                     width={30} xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2"></path>
                                </svg>
                            </label>
                        </div>
                        <h1 class="text-2xl font-bold">{chatType}</h1>
                        <div class="dropdown dropdown-bottom dropdown-end">
                            <!--                        three dot, ellipsis-->
                            <label class="btn btn-ghost" tabindex="0">
                                <svg focusable="false" height={30} viewBox="0 0 24 24" width={30}
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                                </svg>
                            </label>

                            <ul class="dropdown-content menu bg-base-100 w-56 p-2 rounded-box">
                                <li class="menu-title">
                                    <span>插件功能</span>
                                </li>
                                <Links isLink={true}></Links>
                                <li class="menu-title">
                                    <span>聊天后端</span>
                                </li>
                                <SimpleSelect
                                        bind:bind_value={chatType}
                                        keys={chatTypes}
                                        values={chatTypes}
                                />
                            </ul>
                        </div>
                    </nav>
                </div>
                <Chat
                        bind:vm={vm}
                        bind:isOpen={isOpen}
                >
                </Chat>



            </div>
            <div class="drawer-side">
                <label class="drawer-overlay" for="chat-drawer"></label>
                <ul class="menu p-4 w-80 bg-base-100">
                    <VerticalNavList></VerticalNavList>

                </ul>
            </div>
        </div>

        <div class="btn btn-ghost {isOpen ? '' : 'glass'} sidebar-toggle" on:click={openOnClick}>
            <div class="rounded-full {isOpen ? 'ring ring-pink-50' : ''} ring-offset-base-100 ring-offset-2">
                <Icon alt={isOpen ? "打开": "合上"} src={isOpen ? icon_opened : icon_closed}/>
            </div>
        </div>
    </div>

</PromiseWaiting>

