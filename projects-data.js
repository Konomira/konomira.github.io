// Projects data - easily add/edit projects here
const projectsData = [
    {
        id: 'vanspace',
        title: 'VanSpace 3D',
        category: ['3d', 'leadership'],
        description: 'Led development of a sophisticated 3D interior design application for van conversions. Managed technical architecture and team coordination over 5 years.',
        tags: ['Unity3D', 'Team Lead', '3D Modeling', 'Client Project'],
        technologies: 'Unity, C#, 3D Graphics, UI/UX',
        role: 'Team Lead & Lead Programmer',
        duration: '5 years (Ongoing)',
        highlights: [
            'Architected complex 3D design system',
            'Led team of developers',
            'Client-facing technical leadership',
            'Delivered regular feature updates'
        ],
        links: {
            website: 'https://www.vanspace3d.co/'
        },
        featured: true
    },
    {
        id: 'webdungeon',
        title: 'WebDungeon',
        category: ['games'],
        description: 'A procedurally generated roguelike dungeon crawler built in Unity and compiled to WebGL. Features dynamic level generation, combat systems, and inventory management.',
        tags: ['Unity', 'WebGL', 'Procedural Generation', 'Roguelike'],
        technologies: 'Unity, C#, WebGL, Procedural Generation',
        role: 'Solo Developer',
        highlights: [
            'Procedural dungeon generation algorithm',
            'Real-time combat and AI',
            'Inventory and equipment system',
            'Optimized for web performance'
        ],
        links: {
            demo: './webdungeon/index.html',
            github: null // Add if you want to link to repo
        },
        playable: true,
        featured: false
    },
    {
        id: 'solitaire',
        title: 'Solitaire',
        category: ['games'],
        description: 'Classic solitaire card game with smooth animations and intuitive drag-and-drop controls. Built to showcase polished UI/UX and game logic implementation.',
        tags: ['Unity', 'WebGL', 'Game Logic', 'UI/UX'],
        technologies: 'Unity, C#, WebGL, UI System',
        role: 'Solo Developer',
        highlights: [
            'Smooth card animations',
            'Intuitive drag-and-drop interface',
            'Classic solitaire rules implementation',
            'Responsive web design'
        ],
        links: {
            demo: './solitaire/play.html',
            github: null
        },
        playable: true,
        featured: false
    },
	{
        id: 'crystallinerunner',
        title: 'Crystalline Runner',
        category: ['games', '3D'],
        description: 'Vibrant neon endless runner inspired by subway surfers',
        tags: ['Unity', 'WebGL', 'Game Logic', 'UI/UX'],
        technologies: 'Unity, C#, WebGL, UI System',
        role: 'Solo Developer',
        highlights: [
            'Custom URP Shaders',
            'Procedural level generation',
            'Original Soundtrack',
            'Optimised for web performance'
        ],
        links: {
            demo: './crystallinerunner/#',
            github: null
        },
        playable: true,
        featured: false
    },
    {
        id: 'shoejackcity',
        title: 'ShoeJack City',
        category: ['games', 'leadership'],
        description: 'Project lead and sole programmer on this 2D real-time action game. Successfully delivered complete game development cycle for client.',
        tags: ['Unity', '2D', 'Action Game', 'Client Project'],
        technologies: 'Unity, C#, 2D Animation',
        role: 'Project Lead & Programmer',
        highlights: [
            'Led complete game development cycle',
            'Implemented real-time action mechanics',
            '2D animation and art pipeline',
            'Client-facing project management'
        ],
        links: {},
        featured: false
    },
    {
        id: 'vanlifemakeover',
        title: 'VanLife Makeover',
        category: ['games', '3d'],
        description: 'UX programmer for mobile van customization game on Android and iOS. Successfully delivered cross-platform mobile experience for client.',
        tags: ['Unity', 'Mobile', 'UX', 'Client Project'],
        technologies: 'Unity, C#, iOS, Android',
        role: 'UX Programmer',
        highlights: [
            'Cross-platform mobile development',
            'Intuitive touch-based UX',
            'Performance optimization for mobile',
            'Client delivery and iteration'
        ],
        links: {},
        featured: false
    }
];

// Helper function to get projects by category
function getProjectsByCategory(category) {
    if (category === 'all') {
        return projectsData;
    }
    return projectsData.filter(project => project.category.includes(category));
}

// Helper function to get featured projects
function getFeaturedProjects() {
    return projectsData.filter(project => project.featured);
}