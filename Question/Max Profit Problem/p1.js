function maxProfit(timeUnits) {
    // Define property details
    const properties = [
      { name: "T", time: 5, earning: 1500 },
      { name: "P", time: 4, earning: 1000 },
      { name: "C", time: 10, earning: 3000 },
    ];
  
    // DP array to store max earnings
    const dp = Array(timeUnits + 1).fill(0);
    // To store the chosen properties for backtracking
    const choice = Array(timeUnits + 1).fill(null);
  
    // DP computation
    for (let t = 1; t <= timeUnits; t++) {
      for (const prop of properties) {
        if (t >= prop.time) {
          const newEarning = dp[t - prop.time] + prop.earning;
          if (newEarning > dp[t]) {
            dp[t] = newEarning;
            choice[t] = prop.name;
          }
        }
      }
    }
  
    // Backtrack to find the mix
    let t = timeUnits;
    const result = { T: 0, P: 0, C: 0 };
    while (t > 0 && choice[t] !== null) {
      result[choice[t]] += 1;
      const propTime = properties.find(prop => prop.name === choice[t]).time;
      t -= propTime;
    }
  
    return { earnings: dp[timeUnits], solution: result };
  }
  
  // Wrapping the test cases in a block to avoid redeclaration
  {
    const testCases = [7, 8, 13];
    testCases.forEach(time => {
      const { earnings, solution } = maxProfit(time);
      console.log(`Time Units: ${time}`);
      console.log(`Earnings: $${earnings}`);
      console.log(`Solutions:`, solution);
      console.log();
    });
  }
  