const apiUrl = 'https://crudcrud.com/api/2055282f518c476db92451c8b1ab3c2c/posts';

// Function to fetch all blog posts
async function fetchBlogs() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return [];
    }
}

// Function to display all blog posts and update count
async function displayBlogs() {
    const blogList = document.getElementById("blogList");
    blogList.innerHTML = ''; // Clear existing blog posts

    const blogs = await fetchBlogs();
    const blogCount = blogs.length;
    document.getElementById("blogCount").textContent = blogCount;

    blogs.forEach(blog => {
        const blogItem = `
            <div class="blog-item">
                <img src="${blog.imageURL}" alt="${blog.title}" style="max-width: 40%;">
                <h2>${blog.title}</h2>
                <p>${blog.description}</p>
                <button onclick="editBlog('${blog._id}')">Edit</button>
                <button onclick="deleteBlog('${blog._id}')">Delete</button>
            </div>
        `;
        blogList.innerHTML += blogItem;
    });
}

// Function to post a new blog
async function postBlog() {
    const imageURL = document.getElementById("imageURL").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    try {
        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                imageURL,
                title,
                description
            }),
        });
        // Clear input fields after posting
        document.getElementById("imageURL").value = "";
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";

        // Display updated blog list
        await displayBlogs();
    } catch (error) {
        console.error('Error posting blog:', error);
    }
}

// Function to delete a blog
async function deleteBlog(blogId) {
    try {
        await fetch(`${apiUrl}/${blogId}`, {
            method: 'DELETE',
        });
        // Display updated blog list
        await displayBlogs();
    } catch (error) {
        console.error('Error deleting blog:', error);
    }
}

// Initial display of blogs when the page loads
displayBlogs();
