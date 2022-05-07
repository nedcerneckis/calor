import boto3
import json
import uuid

def lambda_handler(event, context):

    record = event['Records'][0]
    
    s3_bucket_name = record['s3']['bucket']['name']
    s3_object_name = record['s3']['object']['key']
    
    s3_path = "s3://" + s3_bucket_name + "/public/" + s3_object_name
    job_name = s3_object_name + '-' + str(uuid.uuid4())

    client = boto3.client('transcribe')

    response = client.start_transcription_job(
        TranscriptionJobName=job_name,
        LanguageCode='en-IE',
        MediaFormat='mp4',
        Media={
            'MediaFileUri': s3_path
        },
        OutputBucketName = "calortranscriptionoutput"
    )


    return {
        'TranscriptionJobName': response['TranscriptionJob']['TranscriptionJobName']
    }