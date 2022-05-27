using Azure.Storage.Blobs;
using System;

namespace TaskManager.Services.profilePicture
{
    public interface IProfilePictureService
    {
        Uri GetServiceSasUriForBlob(BlobClient blobClient, string storedPolicyName = null);
    }
}
