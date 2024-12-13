<script setup lang="ts">
import AlbumImageUrl from '@/assets/static/images/album.jpg'
import UserAvatarUrl from '@/assets/static/images/user-avatar.jpg'
</script>

<template>
    <div>
        <div class="album-header">
            <div class="album-image">
                <div class="mask"></div>
                <img :src="AlbumImageUrl" alt="封面" />
            </div>
            <div class="album-detail">
                <div class="album-info">
                    <h2 class="title">我喜欢的音乐</h2>
                    <div class="creator">
                        <img :src="UserAvatarUrl" alt="用户头像" class="avatar" />
                        <span class="user-name">葉羽.Gmiko</span>
                        <span class="create-time">2020-01-13创建</span>
                    </div>
                </div>
                <NSpace class="operator">
                    <NButton type="primary">播放全部</NButton>
                    <NButton>批量操作</NButton>
                    <NButton>...</NButton>
                </NSpace>
            </div>
        </div>
        <NFlex class="music-table" justify="space-between"> </NFlex>
    </div>
</template>

<style scoped lang="scss">
.album-header {
    display: flex;
    height: 160px;

    .album-image {
        position: relative;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;

        .mask {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.05);
        }

        img {
            height: 100%;
        }
    }

    .album-detail {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .album-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
            margin: 0;
        }

        .creator {
            margin-top: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            height: 20px;

            .avatar {
                height: 100%;
            }

            .create-time {
                color: rgba(0, 0, 0, 0.6);
            }
        }
    }
}
.music-table {
    margin-top: 20px;
}
</style>
