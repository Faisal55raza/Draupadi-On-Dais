import requests


def caller(url: str):
    try:
        # Send a GET request to the API
        response = requests.get(url)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Save the response data to a variable
            api_data = response.json()  # Assuming the response is in JSON format
            return api_data
        else:
            print(
                "Failed to fetch data from the API. Status code:", response.status_code
            )

    except Exception as e:
        print("Error:", e)
