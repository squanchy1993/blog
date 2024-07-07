interface Project {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
}

const projectsData: Project[] = [
  {
    title: 'Uav inspection system',
    description: `The UAV inspection management system includes equipment management, route creation, 
    task delivery, process monitoring and 3D display. Using WebSocket real-time communication, 
    integrated Cesium for 3D display and historical playback`,
    imgSrc: '/static/images/project/uav/patroling_en.png',
    href: '',
  },
  {
    title: 'Explosion-proof inspection robot',
    description: `The project aims to use robots instead of humans to monitor the safety indicators of natural gas stations and ensure safe production. 
    Use ECharts' geo capability to display the robot's location in real time and communicate in real time via WebSocket.`,
    imgSrc: '/static/images/project/explosive/patroling_zh.png',
    href: '',
  },
  {
    title: 'Robot control App',
    description: `The App, written primarily in Flutter, uses the VLC plugin to stream robot videos and integrates the Flutter plugin of a third-party SDK to control the rotation of the camera.`,
    imgSrc: '/static/images/project/pad/pad1_en.png',
    href: '',
  },
]

export default projectsData
