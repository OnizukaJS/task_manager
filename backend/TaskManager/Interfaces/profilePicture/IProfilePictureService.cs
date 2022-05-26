using Azure.Storage.Blobs;
using System;

namespace TaskManager.Interfaces.profilePicture
{
    public interface IProfilePictureService
    {
        Uri GetServiceSasUriForBlob(BlobClient blobClient, string storedPolicyName = null);
    }
}
