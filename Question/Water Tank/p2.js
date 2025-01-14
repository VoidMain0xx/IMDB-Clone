// Input array
const heights = [0, 4, 0, 0, 6, 0, 6, 4, 0];

// Function to calculate trapped water
function calculateWater(heights) {
  const n = heights.length;
  const leftMax = Array(n).fill(0);
  const rightMax = Array(n).fill(0);
  let water = 0;

  // Calculate leftMax for each block
  leftMax[0] = heights[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
  }

  // Calculate rightMax for each block
  rightMax[n - 1] = heights[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
  }

  // Calculate water trapped for each block
  const waterLevels = [];
  for (let i = 0; i < n; i++) {
    const trapped = Math.min(leftMax[i], rightMax[i]) - heights[i];
    water += trapped > 0 ? trapped : 0;
    waterLevels.push(trapped > 0 ? trapped : 0);
  }

  return { water, waterLevels };
}

// Function to render SVG visualization
function renderVisualization(heights, waterLevels) {
  const svg = document.getElementById("visualization");
  const blockWidth = 30;
  const blockHeight = 20;
  svg.innerHTML = ""; // Clear previous SVG elements

  for (let i = 0; i < heights.length; i++) {
    // Render blocks
    svg.innerHTML += `<rect class="block" x="${i * blockWidth}" y="${
      200 - heights[i] * blockHeight
    }" width="${blockWidth}" height="${heights[i] * blockHeight}"></rect>`;

    // Render water
    if (waterLevels[i] > 0) {
      svg.innerHTML += `<rect class="water" x="${i * blockWidth}" y="${
        200 - (heights[i] + waterLevels[i]) * blockHeight
      }" width="${blockWidth}" height="${waterLevels[i] * blockHeight}"></rect>`;
    }
  }
}

// Main execution
const { water, waterLevels } = calculateWater(heights);
document.getElementById("output").innerText = `Output: ${water} Units of Water`;
renderVisualization(heights, waterLevels);
