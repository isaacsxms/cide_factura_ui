<template>
    <h1 class="text-center green">
        <slot></slot>
    </h1>
</template>

<style scoped>
.green {
    color: rgb(21, 133, 21);
    font-weight: 700;
    text-shadow: 1px 1px rgb(0, 0, 0);
}
</style>