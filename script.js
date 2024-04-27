function getTotals() {
    const username = document.getElementById("username").value;

    // Fetch data from Google Sheets API
    fetch('https://script.google.com/macros/s/AKfycbyUg1pXHHH9sIk5zwC_tLRK2hV0775cZ6RvqzVxsmvm-WALeOGzXrkyIyhxhZ6tNJHq6w/exec')
	.then(response => response.json())
    .then(data => {
      // Initialize an object to store sums for each category
      let sums = {};

      // Iterate over each row starting from the second row (index 1)
      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const discordUsername = row[1]; // Discord username is in the second column (index 1)
        
        // Check if the Discord username matches the one entered by the user
        if (discordUsername === username) {
          // Initialize sum for the username if it doesn't exist
          if (!sums[username]) {
            sums[username] = {
              'Articles of clothing': 0,
              'Digital (MB)': 0,
              'Small Items': 0,
              'Medium Items / Bundles': 0,
              'Large Items': 0,
              'Upcycled / Repurposed': 0,
              'Repaired': 0
            };
          }

          // Iterate over each category and add it to the corresponding sum
          for (let j = 2; j < row.length; j++) { // Start from index 2 to skip timestamp and username columns
            const category = data[0][j]; // Get the category name from the first row (headers)
            sums[username][category] += Number(row[j]); // Convert the value to a number and add it to the sum
          }
        }
      }

      // Display sums in HTML
      const totalsContainer = document.getElementById('totals');
      totalsContainer.innerHTML = '';

      // Create a heading element for the username
      const heading = document.createElement('h2');
      heading.textContent = username;
      totalsContainer.appendChild(heading);

      // Create a list element to display the category sums
      const list = document.createElement('ul');

      // Iterate over the category sums
      for (const [category, sum] of Object.entries(sums[username])) {
        // Create a list item for each category sum
        const listItem = document.createElement('li');
        listItem.textContent = `${category}: ${sum}`;
        list.appendChild(listItem);
      }

      // Append the list to the container
      totalsContainer.appendChild(list);
    })
    .catch(error => console.error('Error:', error));
}