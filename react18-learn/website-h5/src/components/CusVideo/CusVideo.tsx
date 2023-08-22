import React from 'react'
import DPlayer from 'dplayer'

export default function CusVideo() {
    const dp = new DPlayer({
        container: document.getElementById('dplayer'),
        video: {
            url: 'demo.mp4',
        },
    });
    return (
        <div>
            自定义播放器
            <div id="dplayer"></div>
        </div>
    )
}
