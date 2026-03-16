export const DESIGN_SKILLS = `
### EXPERT DESIGN SKILLS:
- **Spatial Precision**: Use generous, intentional whitespace (80px+ sections). Use a consistent 4px or 8px grid system.
- **Micro-Interactions**: Use Framer Motion for subtle hover effects, layout transitions, and scroll animations.
- **Glassmorphism**: Implement translucent backgrounds with \`backdrop-blur-md\` and subtle 1px white borders (opacity 10-20%) for a premium feel.
- **Bento Grids**: Use CSS Grid to create asymmetrical, masonry-style layouts for feature sections.
- **Typography as Art**: Use large, bold headings with negative letter-spacing for high-impact visual hierarchy.
- **Layered Depth**: Use multiple soft shadows (\`box-shadow\`) instead of single harsh ones to create realistic elevation.
- **Dynamic Gradients**: Use multi-stop radial and linear gradients for backgrounds and buttons.
- **Responsive Fluidity**: Ensure layouts adapt gracefully using container queries or flexible flex/grid systems.
`;

export function getDesignSkills(persona?: string): string {
    // Can be extended to return specific skills based on persona
    return DESIGN_SKILLS;
}
