/*
 * Copyright 2012 Aetna, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0.html
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

#import "Model/RRXSearchRequest.h"
#import "Model/RRXSearchRequestMarshaller.h"
#import "Model/RRXSearchResponse.h"
#import "Model/RRXSearchResponseUnmarshaller.h"

#import "RRXRequest.h"
#import "RRXResponse.h"
#import "../CarePassWebServiceClient.h"

/** <summary>
 * Interface for accessing the HHS API endpoints.
 *
 *  CarePass HHS API
 * </summary>
 *
 * \ingroup HHS
 */
@interface CarePassRRXClient : CarePassWebServiceClient

/**
 * <p>
 * The ARTSearch action searches for the details of an Assistive Reproductive
 * Technology Clinic based on the parameters supplied in the request
 * </p>
 *
 * @param searchRequest Container for the necessary parameters to
 *           execute the ARTSearch service method on CarePass HHS.
 *
 * @return The response from the ARTSearch service method, as returned by
 *         CarePass HHS.
 *
 * @throws HHSInternalErrorException
 * @throws HHSValidationErrorException
 *
 * @throws CarePassClientException
 *             If any internal errors are encountered inside the client while
 *             attempting to make the request or handle the response.  For example
 *             if a network connection is not available.
 * @throws CarePassServiceException
 *             If an error response is returned by CarePass indicating
 *             either a problem with the data in the request, or a server side issue.
 */
-(RRXSearchResponse *)lowSearch:(RRXSearchRequest *)searchRequest;

/**
 * <p>
 * The FDARecall action searches for ... based on the parameters supplied in the request
 * </p>
 *
 * @param searchRequest Container for the necessary parameters to
 *           execute the FDARecall service method on CarePass HHS.
 *
 * @return The response from the FDARecall service method, as returned by
 *         CarePass HHS.
 *
 * @throws HHSInternalErrorException
 * @throws HHSValidationErrorException
 *
 * @throws CarePassClientException
 *             If any internal errors are encountered inside the client while
 *             attempting to make the request or handle the response.  For example
 *             if a network connection is not available.
 * @throws CarePassServiceException
 *             If an error response is returned by CarePass indicating
 *             either a problem with the data in the request, or a server side issue.
 */
-(RRXSearchResponse *)compareSearch:(RRXSearchRequest *)searchRequest;

@end
