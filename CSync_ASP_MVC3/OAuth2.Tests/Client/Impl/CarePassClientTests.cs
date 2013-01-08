using System.Collections.Specialized;
using FluentAssertions;
using NSubstitute;
using NUnit.Framework;
using OAuth2.Client;
using OAuth2.Client.Impl;
using OAuth2.Configuration;
using OAuth2.Infrastructure;
using OAuth2.Models;

namespace OAuth2.Tests.Client.Impl
{
    [TestFixture]
    public class CarePassClientTests
    {
        private const string content = "{\"email\":\"joe@fakemail.com\",\"firstName\":\"joe\",\"lastName\":\"black\",\"id\":\"12345\"}";
        private const string mod_content = "{\"email\":\"joe@fakemail.com\",\"firstName\":\"joe\",\"lastName\":\"black\",\"id\":\"12345\",\"access_token\": \"XXXXXXXXxxxxxxxxxxxXXX\"}";
        private CarePassClientDescendant descendant;
        private IRequestFactory requestFactory;

        [SetUp]
        public void SetUp()
        {
            requestFactory = Substitute.For<IRequestFactory>();
            descendant = new CarePassClientDescendant(
                requestFactory, Substitute.For<IClientConfiguration>());
        }

        [Test]
        public void Should_ReturnCorrectAccessCodeServiceEndpoint()
        {
            // act
            var endpoint = descendant.GetAccessCodeServiceEndpoint();

            // assert
            endpoint.BaseUri.Should().Be("https://www.carepass.com/carepass");
            endpoint.Resource.Should().Be("/oauth/authorize");
        }

        [Test]
        public void Should_ReturnCorrectAccessTokenServiceEndpoint()
        {
            // act
            var endpoint = descendant.GetAccessTokenServiceEndpoint();

            // assert
            endpoint.BaseUri.Should().Be("https://www.carepass.com/carepass");
            endpoint.Resource.Should().Be("/oauth/token");
        }

        [Test]
        public void Should_ReturnCorrectUserInfoServiceEndpoint()
        {
            // act
            var endpoint = descendant.GetUserInfoServiceEndpoint();

            // assert
            endpoint.BaseUri.Should().Be("https://api.carepass.com/user-directory-api");
            endpoint.Resource.Should().Be("/users/currentUser");
        }

        [Test]
        public void Should_ParseAllFieldsOfUserInfo_WhenCorrectContentIsPassed()
        {
            // act
            var info = descendant.ParseUserInfo(content);

            //  assert
            info.Id.Should().Be("12345");
            info.FirstName.Should().Be("joe");
            info.LastName.Should().Be("black");
            info.Email.Should().Be("joe@fakemail.com");
        }

        [Test]
        public void Should_AddExtraParameters_WhenOnGetUserInfoIsCalled()
        {
            // arrange
            requestFactory.NewClient().Execute(requestFactory.NewRequest()).Content.Returns(mod_content);

            // act
            descendant.GetUserInfo(new NameValueCollection());

            // assert
            requestFactory.NewRequest()
                .Received(1)
                .AddHeader("Authorization", string.Format("Bearer {0}", descendant.AccessToken));

            descendant.AccessToken.Should().Be("XXXXXXXXxxxxxxxxxxxXXX");
        }

        class CarePassClientDescendant : CarePassClient
        {
            public CarePassClientDescendant(IRequestFactory factory, IClientConfiguration configuration)
                : base(factory, configuration)
            {
            }

            public Endpoint GetAccessCodeServiceEndpoint()
            {
                return AccessCodeServiceEndpoint;
            }

            public Endpoint GetAccessTokenServiceEndpoint()
            {
                return AccessTokenServiceEndpoint;
            }

            public Endpoint GetUserInfoServiceEndpoint()
            {
                return UserInfoServiceEndpoint;
            }

            public new UserInfo ParseUserInfo(string content)
            {
                return base.ParseUserInfo(content);
            }
        }
    }

}
