<script>
  export let title;
  export let default_open = true;

</script>


<div tabindex="0"
     class="collapse collapse-arrow {default_open? 'collapse-open' : 'collapse-close'} border bg-base-100"
     >
  <input type="checkbox"/>
  <div class="collapse-title text-lg font-medium" on:click={() => default_open = !default_open}>
    {title}
  </div>
  <div class="collapse-content">
    <slot />
  </div>
</div>
