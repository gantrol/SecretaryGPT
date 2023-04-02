<script>
    import LinkButton from "~components/LinkButton.svelte";
    import {LinkType} from "~utils/constants";
    import ConditionalCollapse from "~components/ConditionalCollapse.svelte";

    export let isLink = false;
    let title = "链接";
</script>

<ConditionalCollapse {title} has_collapse={!isLink}>

</ConditionalCollapse>
