<template>
  <a-menu-item :style="menuItemStyle">
    <a-icon :style="iconStyle" :type="icon" />
    <a href="javascript:;">{{ label }}</a>
  </a-menu-item>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            menuItemStyle: {
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center'
            },
            iconStyle: {
                marginTop: '2px'
            }
        }
    }
}
</script>
