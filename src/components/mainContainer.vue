<template>
    <div class="main">
        <!-- <object classid="clsid:FF09E4FA-BFAA-486E-ACB4-86EB0AE875D5" codebase="WebOffice.ocx#Version=2018,1,6,2" id="WebOffice" width="100%" height="100%" >
            <param name="Menubar" value="1"> 
            <param name="Titlebar" value="1">
            <param name="Toolbars" value="1">
        </object> -->
        <com-wxjc></com-wxjc>
    </div>
</template>

<script>

import comWxjc from '@/components/comWxjc'

export default {
    name: "mainContainer",
    components: {
        comWxjc
    }
}

</script>

<style scoped>
    .main {
        position: absolute;
        top: 10px;
        bottom: 0px;
        left: 10px;
        right: 0;
        overflow: auto;
        /* background-color: #545c64; */
        background-color: #fff;
        border-radius: 5px 0 0 0;
        padding: 10px 10px 0 10px
    }
</style>