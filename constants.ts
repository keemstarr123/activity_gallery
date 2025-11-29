import { MemoryEvent } from './types';
import * as THREE from 'three';

export const TIMELINE_DATA: MemoryEvent[] = [
  {
    "id": "evt-001",
    "timestamp": "2022-01-05T10:00:00Z",
    "title": "Selamat Datang!",
    "type": "onboarding",
    "thumbnailUrl": "https://picsum.photos/200/200?random=1",
    "description": "You joined the family. Welcome to the journey!",
    "voxelModel": "voxel_person.glb"
  },
  {
    "id": "evt-002",
    "timestamp": "2022-02-12T14:33:00Z",
    "title": "First Nasi Lemak",
    "type": "order",
    "thumbnailUrl": "https://picsum.photos/200/200?random=2",
    "description": "Your first order was a local favorite. RM138 well spent.",
    "metadata": { "value": 138, "items": 3 },
    "voxelModel": "voxel_shopping_bag.glb"
  },
  {
    "id": "evt-003",
    "timestamp": "2022-04-01T09:12:00Z",
    "title": "Kaki Travel",
    "type": "achievement",
    "thumbnailUrl": "https://picsum.photos/200/200?random=3",
    "description": "You unlocked the Bronze Traveler tier.",
    "voxelModel": "voxel_trophy.glb"
  },
  {
    "id": "evt-004",
    "timestamp": "2022-05-22T18:20:00Z",
    "title": "Live Chat Support",
    "type": "interaction",
    "thumbnailUrl": "https://picsum.photos/200/200?random=4",
    "description": "We helped sort out your delivery issue.",
    "voxelModel": "voxel_chat_bubble.glb"
  },
  {
    "id": "evt-005",
    "timestamp": "2022-08-31T10:30:00Z",
    "title": "Merdeka Special",
    "type": "event",
    "thumbnailUrl": "https://picsum.photos/200/200?random=5",
    "description": "Celebrating 65 years of independence with us.",
    "voxelModel": "voxel_stage.glb"
  },
  {
    "id": "evt-006",
    "timestamp": "2022-11-11T11:11:00Z",
    "title": "11.11 Mega Sale",
    "type": "order",
    "metadata": { "value": 399 },
    "description": "You grabbed the best deals of the year!",
    "voxelModel": "voxel_box.glb"
  },
  {
    "id": "evt-007",
    "timestamp": "2023-01-22T08:45:00Z",
    "title": "CNY Ang Pao",
    "type": "reward",
    "description": "You redeemed a prosperity voucher.",
    "voxelModel": "voxel_gift.glb"
  },
  {
    "id": "evt-008",
    "timestamp": "2023-05-11T13:10:00Z",
    "title": "Silver Tier Upgrade",
    "type": "achievement",
    "voxelModel": "voxel_medal_silver.glb"
  },
  {
    "id": "evt-009",
    "timestamp": "2023-04-22T10:00:00Z",
    "title": "Balik Kampung",
    "type": "action",
    "description": "Logged in from your hometown!",
    "voxelModel": "voxel_people.glb"
  },
  {
    "id": "evt-010",
    "timestamp": "2023-10-15T09:00:00Z",
    "title": "100 Days Strong",
    "type": "milestone",
    "voxelModel": "voxel_calendar.glb"
  },
  {
    "id": "evt-011",
    "timestamp": "2024-01-12T12:00:00Z",
    "title": "Super Fan Badge",
    "type": "achievement",
    "voxelModel": "voxel_badge.glb"
  },
  {
    "id": "evt-012",
    "timestamp": "2024-03-07T08:15:00Z",
    "title": "We Missed You",
    "type": "alert",
    "description": "Come back for more rewards!",
    "voxelModel": "voxel_warning.glb"
  },
  {
    "id": "evt-013",
    "timestamp": "2024-04-10T14:40:00Z",
    "title": "Raya Lucky Draw",
    "type": "reward",
    "description": "You won a RM50 Duit Raya.",
    "voxelModel": "voxel_treasure_chest.glb"
  },
  {
    "id": "evt-014",
    "timestamp": "2024-05-01T15:00:00Z",
    "title": "Grand Finale",
    "type": "summary",
    "description": "Thank you for being part of our story.",
    "voxelModel": "voxel_fireworks.glb"
  }
];

// Generate a gentle curve for the timeline
export const CURVE_POINTS = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, -20),
  new THREE.Vector3(10, 2, -40),
  new THREE.Vector3(-5, -1, -60),
  new THREE.Vector3(-10, 3, -80),
  new THREE.Vector3(5, 5, -100),
  new THREE.Vector3(0, 8, -120),
  new THREE.Vector3(0, 10, -140),
];

export const PATH_CURVE = new THREE.CatmullRomCurve3(CURVE_POINTS);

// Soft Pastel Kampung Palette
export const COLORS = {
  onboarding: '#86efac', // Soft Green
  order: '#93c5fd',      // Soft Blue
  achievement: '#fde047',// Soft Yellow/Gold
  interaction: '#c4b5fd',// Soft Purple
  event: '#f9a8d4',      // Soft Pink
  reward: '#fca5a5',     // Soft Red
  action: '#5eead4',     // Teal
  milestone: '#6ee7b7',  // Emerald
  alert: '#fda4af',      // Rose
  summary: '#d8b4fe',    // Lavender
  highlight: '#ffffff',
  bg: '#f0f9ff'          // Very light blue sky
};