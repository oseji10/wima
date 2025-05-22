<!DOCTYPE html>
<html>
<head>
    <title>New Service Request</title>
</head>
<body>
    <h1>New Service Request</h1>
    <p>Dear Admin,<br/>
       Kindly be informed that a new service request has been submitted by a user. Here are the details below:</p>
    <p><strong>Name:</strong> {{ $name }}</p>
    <p><strong>Email:</strong> {{ $email }}</p>
    <p><strong>Phone Number:</strong> {{ $phone_number }}</p>
    <p><strong>State:</strong> {{ $state }}</p>
    <p><strong>LGA:</strong> {{ $lga }}</p>
    <p><strong>Services Requested:</strong> {{ is_array($service) ? implode(', ', $service) : e($service ?? '') }}</p>
    <!-- <p><strong>Service Requested:</strong> {{ $service }}</p> -->
    <p>Please review and assign the request accordingly.</p>
</body>
</html>