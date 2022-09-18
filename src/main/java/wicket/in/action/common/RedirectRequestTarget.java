/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package wicket.in.action.common;

import org.apache.wicket.IRequestTarget;
import org.apache.wicket.RequestCycle;
import org.apache.wicket.Response;

public class RedirectRequestTarget implements IRequestTarget {

  private final String redirectUrl;

  public RedirectRequestTarget(String redirectUrl) {
    this.redirectUrl = redirectUrl;
  }

  public void detach(RequestCycle requestCycle) {
  }

  public void respond(RequestCycle requestCycle) {
    Response response = requestCycle.getResponse();
    response.reset();
    if (redirectUrl.startsWith("/")) {
      response.redirect(RequestCycle.get().getRequest()
          .getRelativePathPrefixToContextRoot()
          + redirectUrl.substring(1));
    } else if (redirectUrl.startsWith("http://")
        || redirectUrl.startsWith("https://")) {
      response.redirect(redirectUrl);
    } else {
      response.redirect(RequestCycle.get().getRequest()
          .getRelativePathPrefixToWicketHandler()
          + redirectUrl);
    }
  }
}
