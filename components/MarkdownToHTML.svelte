<script>
    export let text;

    import {marked} from "marked";
</script>

{@html marked.parse(
    text
)}
