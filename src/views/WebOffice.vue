<template>
  <div class="webOffice">
    <object
      classid="clsid:FF09E4FA-BFAA-486E-ACB4-86EB0AE875D5"
      codebase="WebOffice.ocx#Version=2018,1,6,2"
      id="WebOffice"
      width="100%"
      height="900"
    >
      <param name="Menubar" value="1" />
      <param name="Titlebar" value="1" />
      <param name="Toolbars" value="1" />
    </object>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "WebOffice",
  components: {
    // HelloWorld
  },
};
</script>
