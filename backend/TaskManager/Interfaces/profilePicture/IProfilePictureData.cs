using Azure.Storage.Blobs;
using System;

namespace TaskManager.Interfaces.profilePicture
{
    public interface IProfilePictureData
    {
        Uri GetServiceSasUriForBlob(BlobClient blobClient, string storedPolicyName = null);
    }
}
